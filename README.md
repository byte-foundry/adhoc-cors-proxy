Ad-hoc cors proxy
=================

Simple reliable node-based cors proxy to a specific target.

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

## Exemple

    corsproxy http://www.target.com -p 9292