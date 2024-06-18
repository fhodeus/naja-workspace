Endeavour CLI
======

Commands relating to endeavour frontend build process.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @endeavour/cli
$ dragon COMMAND
running command...
$ dragon (-v|--version|version)
@endeavour/cli/1.0.0 linux-x64 node-v14.18.0
$ dragon --help [COMMAND]
USAGE
  $ dragon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dragon build [TYPE]`](#dragon-build-type)
* [`dragon ensure-certificate HOST`](#dragon-ensure-certificate-host)
* [`dragon help [COMMAND]`](#dragon-help-command)

## `dragon build [TYPE]`

Builds a package using the endeavour common build tools

```
USAGE
  $ dragon build [TYPE]

OPTIONS
  -h, --help                            show CLI help
  -w, --watch                           Use watch mode
  --environment=production|development  Selects which environment to build for
  --format=cjs|esm                      Defines the output module format

EXAMPLE
  $ dragon build library
  built ./dist in 5ms
```

## `dragon ensure-certificate HOST`

Ensures self signed certificate files exist in the specified output directory

```
USAGE
  $ dragon ensure-certificate HOST

ARGUMENTS
  HOST  The host (common name) to generate self signed certificates for

OPTIONS
  -h, --help                       show CLI help
  -o, --outDirectory=outDirectory  [default: ./.certs] The directory to output the certificates into

EXAMPLES
  $ dragon ensure-certificate www.myhostname.com
  $ dragon ensure-certificate www.myhostname.com --outDirectory ./.certs
```

## `dragon help [COMMAND]`

display help for dragon

```
USAGE
  $ dragon help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
