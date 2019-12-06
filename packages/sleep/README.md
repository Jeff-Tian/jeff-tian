# sleep

> Sleep in seconds

[![Build Status](https://travis-ci.com/Jeff-Tian/sleep.svg?branch=master)](https://travis-ci.com/Jeff-Tian/sleep)

## Installation:

```shell
npm i @jeff-tian/sleep --save
```

## Usage:

```typescript
import { sleep } from 'sleep'

await sleep(3)

```

> This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

[![Build Status](https://travis-ci.com/Jeff-Tian/sleep.svg?branch=master)](https://travis-ci.com/Jeff-Tian/sleep)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_sleep)](https://sonarcloud.io/dashboard?id=Jeff-Tian_sleep)

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
