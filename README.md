oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g kubernetes-client
$ kubernetes-client COMMAND
running command...
$ kubernetes-client (--version)
kubernetes-client/0.0.0 linux-x64 node-v16.17.0
$ kubernetes-client --help [COMMAND]
USAGE
  $ kubernetes-client COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`kubernetes-client hello PERSON`](#kubernetes-client-hello-person)
* [`kubernetes-client hello world`](#kubernetes-client-hello-world)
* [`kubernetes-client help [COMMANDS]`](#kubernetes-client-help-commands)
* [`kubernetes-client plugins`](#kubernetes-client-plugins)
* [`kubernetes-client plugins:install PLUGIN...`](#kubernetes-client-pluginsinstall-plugin)
* [`kubernetes-client plugins:inspect PLUGIN...`](#kubernetes-client-pluginsinspect-plugin)
* [`kubernetes-client plugins:install PLUGIN...`](#kubernetes-client-pluginsinstall-plugin-1)
* [`kubernetes-client plugins:link PLUGIN`](#kubernetes-client-pluginslink-plugin)
* [`kubernetes-client plugins:uninstall PLUGIN...`](#kubernetes-client-pluginsuninstall-plugin)
* [`kubernetes-client plugins:uninstall PLUGIN...`](#kubernetes-client-pluginsuninstall-plugin-1)
* [`kubernetes-client plugins:uninstall PLUGIN...`](#kubernetes-client-pluginsuninstall-plugin-2)
* [`kubernetes-client plugins update`](#kubernetes-client-plugins-update)

## `kubernetes-client hello PERSON`

Say hello

```
USAGE
  $ kubernetes-client hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/s-tschne/kubernetes-client/blob/v0.0.0/dist/commands/hello/index.ts)_

## `kubernetes-client hello world`

Say hello world

```
USAGE
  $ kubernetes-client hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ kubernetes-client hello world
  hello world! (./src/commands/hello/world.ts)
```

## `kubernetes-client help [COMMANDS]`

Display help for kubernetes-client.

```
USAGE
  $ kubernetes-client help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for kubernetes-client.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.0/src/commands/help.ts)_

## `kubernetes-client plugins`

List installed plugins.

```
USAGE
  $ kubernetes-client plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ kubernetes-client plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.2.2/src/commands/plugins/index.ts)_

## `kubernetes-client plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ kubernetes-client plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ kubernetes-client plugins add

EXAMPLES
  $ kubernetes-client plugins:install myplugin 

  $ kubernetes-client plugins:install https://github.com/someuser/someplugin

  $ kubernetes-client plugins:install someuser/someplugin
```

## `kubernetes-client plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ kubernetes-client plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ kubernetes-client plugins:inspect myplugin
```

## `kubernetes-client plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ kubernetes-client plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ kubernetes-client plugins add

EXAMPLES
  $ kubernetes-client plugins:install myplugin 

  $ kubernetes-client plugins:install https://github.com/someuser/someplugin

  $ kubernetes-client plugins:install someuser/someplugin
```

## `kubernetes-client plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ kubernetes-client plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ kubernetes-client plugins:link myplugin
```

## `kubernetes-client plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ kubernetes-client plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ kubernetes-client plugins unlink
  $ kubernetes-client plugins remove
```

## `kubernetes-client plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ kubernetes-client plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ kubernetes-client plugins unlink
  $ kubernetes-client plugins remove
```

## `kubernetes-client plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ kubernetes-client plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ kubernetes-client plugins unlink
  $ kubernetes-client plugins remove
```

## `kubernetes-client plugins update`

Update installed plugins.

```
USAGE
  $ kubernetes-client plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
