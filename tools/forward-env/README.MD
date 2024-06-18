# Forward Env

Simple package which forwards the rush environment CLI options as a environment variable that can be picked up in other tooling.

At its core:

1. We take the arguments list passed to `forward-env`
2. We find `--environment` and the associated value 
3. We use that to set `CONFIG_ENV` & `BUILD_ENV` to allow the projects build config to do what they will with them.
4. Take the rest of the arguments passed through and run it (omitting `--environment`)

When using `dragon` command to build a package this forward-env command is not necessary as it handles the `--environment` argument itself.

This project is to be primarily used by packages of which cannot utilise `dragon` either because it uses another build pipeline (such as `vite`) or is used to build `dragon` itself (and therefore would create a circular dependency).