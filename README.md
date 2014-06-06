Ad-hoc cors proxy
=================

[![Dependency Status](https://david-dm.org/byte-foundry/adhoc-cors-proxy.svg)](https://david-dm.org/byte-foundry/adhoc-cors-proxy)

**Simple reliable node-based cors proxy to a specific target.**

Why *simple reliable*? Because it just assembles two well tested and actively maintained middlewares: [http-proxy](https://github.com/nodejitsu/node-http-proxy) and [cors](https://github.com/troygoode/node-cors/). It's a package you could have written yourselve, but this one's ready to use with complete usage instructions (thanks to [docopt](http://github.com/docopt/docopt.coffee)).

## Installation

global install

    $ npm install -g adhoc-cors-proxy


## Usage

    corsproxy <target> [--port=<port>] [--origin=<origin>] [--credentials]
	corsproxy -h | --help | --version

## Options

	-p <port>, --port=<port>        Port number. [default: 9292]
	--host=<host>                   Host
	-o <origin>, --origin=<origin>  Restrict origin domain
	-c, --credentials               access-control-allow-credentials=true

## Example

    corsproxy http://www.target.com -p 9292