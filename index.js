var colors = require('colors'),
	http = require('http'),
	connect = require('connect'),
	cors = require('cors'),
	httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
		target: 'http://prototypo.cloudapp.net:6001/'
	}),
	app = connect()
		// setup CORS headers
		.use(cors({
			origin: true,
			credentials: true,
			maxAge: 0
		}))
		// overload res.setHeader to prevent http-proxy from overwriting the CORS headers
		.use(function(req, res, next) {
			var _setHeader = res.setHeader;

			res.setHeader = function(key, val) {
				// prevent header overwriting
				if ( res.getHeader(key) === undefined ) {
					_setHeader.call(res, key, val);
				}
			};

			next();
		})
		.use(function(req, res) {
			proxy.web(req, res);
		});

http.createServer(app).listen(6004);

colors.setTheme({}); // use colors to prevent jshint complaints
console.log('proxy server '.blue + 'started '.green.bold + 'on port '.blue + '6004 '.yellow);