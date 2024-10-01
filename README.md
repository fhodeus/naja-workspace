### Farmbits Monorepo
# Welcome to Farmbits Rush Project

## Prerequisites

The prerequisites you need is [NodeJS](https://nodejs.org/en/download/) in version ```v18.18.0``` and [PNPM](https://pnpm.io/pt/) for package management.Make sure they are installed.

<b>To check your node version in your shell, use the Node command.</b>
```
$ node -v
```

To sync your Node version with project requirements, it is recommended to use [NVM](https://github.com/nvm-sh).


### *Recomended*

Install [NVM](https://github.com/nvm-sh) to sync your node version with the project node version. Follow the instructions on the nvm page.

After installing follow the instructions

<b>In your shell, use the NVM command to install node version defined in .nvmrc.</b>
```
$ nvm install   
``` 

<b>In your shell, use the NVM command to use Node version defined in .nvmrc</b>
```
$ nvm use 
``` 
 

## Getting started

Want to see Rush in action? The only prerequisite you need is [NodeJS](https://nodejs.org/en/download/)

<b>From your shell, install Rush like this:<b>

```
$ npm install -g @microsoft/rush
```

For command-line help, do this:
```
$ rush -h
```

At the root of the project use a command line:  

```
$ rush install
```
*The "rush install" command installs package dependencies for all your
projects*

To prepare project to work, use :
```
$ rush rebuild
```

*Prepare projects used as dependencies*

### Referencias

- [NodeJS](https://nodejs.org/en/download/) - For prerequisiter instruction.<br> 
- [PNPM](https://pnpm.io/pt/) - For prerequisiter instruction.<br>
- [NVM](https://github.com/nvm-sh) - For recomended instruction. <br>
- [Markdown Syntax](https://www.markdownguide.org/basic-syntax/) - To write the document <br> 
- [Rush Monorepo](https://rushjs.io/pages/intro/get_started/) - For understanding the monorepo and its use.
