# jeff-tian's packages

> Packages published under @jeff-tian

![](https://github.com/jeff-tian/jeff-tian/workflows/Node.js%20CI/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)


## Why

There are more and more packages published under @jeff-tian, so this repo try to gather all of them and manage them
using `lerna`

## packages

- [@jeff-tian/failable](packages/failable)
- [@jeff-tian/gatsby-source-yuque](packages/gatsby-source-yuque)
- [@jeff-tian/gitbook-plugin-edit-link](packages/gitbook-plugin-edit-link)
- [@jeff-tian/gitbook-plugin-klipse](packages/gitbook-plugin-klipse)
- [@jeff-tian/MemoryStorage](packages/MemoryStorage)
- [@jeff-tian/plugin-github](packages/plugin-github)
- [@jeff-tian/sleep](packages/sleep)


## Development

```shell
npm install -g lerna
```

under project root:

```shell script
yarn
npm rebuild # if there were errors regarding @jeff-tian/sleep
yarn test
```

## Add new packages

```shell
lerna create <package-name:mp>
```

## Add dependencies to specific package

```shell script
lerna add gatsby-core-utils --scope=@jeff-tian/gatsby-source-yuque

# Or try using the Copilot suggested one:
yarn add -W -D -E <package-name> --scope=@jeff-tian/<package-name>
```

## Publish

```shell script
yarn pub
```
