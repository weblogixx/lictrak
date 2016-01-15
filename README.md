# lictrak
> Keep track of your npm dependencies licenses

[![Build Status](https://secure.travis-ci.org/weblogixx/lictrak.png?branch=master)](https://travis-ci.org/weblogixx/lictrak)

# What is lictrak?
lictrak (short for license tracker) is a command line utility to track the licenses (you already guessed that, right?) of packages installed in your projects  ```node_modules``` folder.

It was written as an alternative to the (dead simple, but very effective!) [ianal](https://github.com/franciscop/ianal) by [@franciscop](https://github.com/franciscop). While ianal is a great utility on its own, it is far too lightweight for some features I have in mind for such a tool.

## Installation
```bash
npm install -g lictrak
```
Nothing more to say.

## Usage
Without any arguments lictrak will run in a text mode (which was shamelessly stolen from ianal). However, it also supports the following arguments:

```bash
# License here stands for a list of comma delimeted licenses, e.g. MIT,GPL
lictrak [--help] [--list-licenses] [--only=License] [--without=License] [--warn-on=License] [--error-on=License] --formatter=[text,json,html,violations]
```

### Return values
Per default, lictrak will return "0" when it runs. You may set alternative return values when the --warn-on (Return value = 1) or --error-on (value = 2) options are set. If lictrak finds at least a license that are classified as warnings or errors, it will return the corresponding error code. This is usefull when using lictrak as part of continuous integration systems like Jenkins.

## Features (currently more "goals")
- [ ] Get all licenses in a project
- [ ] Filter by licenses (via --grep)
- [ ] Provide different output formatters (e.g. text, json, html, violations by white- or blacklist ...)

## License
lictrak is licensed under the MIT license and is therefore free to use for commercial or private use.
