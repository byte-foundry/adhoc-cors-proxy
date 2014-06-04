var colors = require('colors'),
	http = require('http'),
	connect = require('connect'),
	cors = require('cors'),
	httpProxy = require('http-proxy'),
	docopt = require('docopt').docopt;

var doc = [
			'Cors Proxy',
			'\nUsage:',
				'cors-proxy <target> [--port=<port>] [--origin=<origin>] [--credentials]',
				'cors-proxy -h | --help | --version',
			'\nOptions:',
				'-p <port>, --port=<port>        Port number. [default: 6004]',
				'-o <origin>, --origin=<origin>  Restrict origin domain',
				'-c, --credentials               access-control-allow-credentials=true'
		].join('\n  '),
	options = docopt(doc, {version: require('../package').version}),
	target = process.env.CORSPROXY_TARGET || options['<target>'],
	port = process.env.CORSPROXY_PORT || options['--port'],
	origin = process.env.CORSPROXY_ORIGIN || options['--origin'] || true,
	credentials = process.env.CORSPROXY_CREDENTIALS || options['--credentials'] || false;

var proxy = httpProxy.createProxyServer({
		// add 'http://' prefix if necessary
		target: ( target = /^https?:\/\//.test(target) ? target : 'http://' + target )
	}),
	app = connect()
		// setup CORS headers
		.use(cors({
			origin: origin,
			credentials: credentials
		}))
		// log requests that result in 40X statuses from the target
		.use(function(req, res, next) {
			var _writeHead = res.writeHead;

			res.writeHead = function(statusCode) {
				if ( /^4\d\d/.test(statusCode) ) {
					console.warn(
						'target responded a '.blue + ( statusCode + '' ).red.bold +
						' to '.blue + ( req.method + ' ' + req.url ).yellow +
						' with headers:\n'.blue +
						JSON.stringify( req.headers ).yellow
					);
				}

				_writeHead.apply(res, arguments);
			};

			next();
		})
		// prevent http-proxy from overwriting the CORS headers
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

proxy.on('error', function(e) {
	console.error(e);
});

http.createServer(app).listen(port);

colors.setTheme({}); // use colors to prevent jshint complaints
console.log('proxy to '.blue + target.yellow + ' started '.green.bold + 'on port '.blue + port.yellow);
