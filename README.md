Ad-hoc cors proxy
=================

[![Dependency Status](https://david-dm.org/byte-foundry/adhoc-cors-proxy.svg)](https://david-dm.org/byte-foundry/adhoc-cors-proxy)

**Simple reliable node-based cors proxy to a specific target.**

    corsproxy http://www.target.com -p 8080

Why *simple reliable*? Because it just assembles two well tested and actively maintained middlewares: [http-proxy](https://github.com/nodejitsu/node-http-proxy) and [cors](https://github.com/troygoode/node-cors/). It's a package you could have written yourselve, but this one's ready to use with complete usage instructions (thanks to [docopt](http://github.com/docopt/docopt.coffee)).

## Installation

local testing

    $ npm install adhoc-cors-proxy

global install

    $ npm install -g adhoc-cors-proxy

## Usage

with local install

    node bin <target> [--port=<port>] [--origin=<origin>] [--credentials]
	node bin -h | --help | --version

with global install

    corsproxy <target> [--port=<port>] [--origin=<origin>] [--credentials]
	corsproxy -h | --help | --version

## Options

	-p <port>, --port=<port>        Port number. [default: 9292]
	--host=<host>                   Host
	-o <origin>, --origin=<origin>  Restrict origin domain
	-c, --credentials               access-control-allow-credentials=true

## Production

I recommend using [Heroku](http://www.heroku.com)'s free tier or [pm2](https://github.com/Unitech/pm2) on a virtual-machine cloud-service.

## Development

You can hack into this package by installing [grunt](http://gruntjs.com)

    $ npm install -g grunt-cli

Starting the server and specifying the target has a slightly different syntax:

    $ grunt --target=http://www.target.com -p 8080

Jshint will check your code and the proxy will restart everytime the sources are modified.

## License

[MIT](http://louisremi.mit-license.org)