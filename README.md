# K6 Boilerplate

This is a boilerplate for K6 performance testing using Typescript and a "node-like" environment. This is heavily based off of [Grafana's K6 Typescript Template](https://github.com/grafana/k6-template-typescript).

- [K6 Boilerplate](#k6-boilerplate)
  - [Advantages](#advantages)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Install dependencies](#install-dependencies)
  - [Folder Structure](#folder-structure)
  - [Running the Tests](#running-the-tests)
    - [Build and Run Tests at Same The Time](#build-and-run-tests-at-same-the-time)
  - [Writing Tests](#writing-tests)
  - [Helper Functions](#helper-functions)
    - [K6 HTTP Wrapper Helper](#k6-http-wrapper-helper)
  - [Pre-Commit Tasks](#pre-commit-tasks)
  - [Transpiling and Bundling](#transpiling-and-bundling)


## Advantages
- Linting and Prettier support
- Typescript support
- Simple setup for building and running all tests at once
- DotEnv file support
- K6 HTTP wrapped inside helper function for easy cross-project changes

## Prerequisites

- [K6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/) (Version 18.16.1)
- [Yarn](https://yarnpkg.com/getting-started/install) 

## Installation

### Install dependencies
Clone the generated repository on your local machine, move to the project root folder and install the dependencies defined in [`package.json`](./package.json)

```bash
$ yarn install
```

## Folder Structure
```shell
.
├── dist                          # Temp location of compiled tests
├── src 
│   ├── helpers                   # Store helpers here
│   ├── types                     # Store types here, usually API types 
└   └── Example.test.ts           # Example tests, tests belong in the root of src
```

## Running the Tests

To run a test written in TypeScript, we first have to transpile the TypeScript code into JavaScript and bundle the project

```bash
$ yarn build
```

This command creates the final test files to the `./dist` folder.

Once that is done, we can run our script the same way we usually do, for instance:

```bash
$ yarn test ./dist/test-file-name.js
```

Or we can run all the test files at once using a bash script.

```bash
$ yarn test:all
```

### Build and Run Tests at Same The Time

To support fast development we created the following command that allows you to build and run the tests at the same time.

```bash
$ yarn buildAndTest  ./dist/test-file-name.js
```

Or we can run all the test files at once using a bash script.

```bash
$ yarn buildAndTest:all
```

## Writing Tests
- The test code is located in `src` folder
- The entry points for the tests file names need to end with `.test.ts` to distinguish them from auxiliary files, as configured in [webpack.config.js](./webpack.config.js#L9). 
- The `./src/data` folder is used to store data files.
 - Note you can import json files directly by using `import someName from './data/someJsonFile.json'`.
 - Other, non `.json` and `.ts` data files, such as images or documents, will be copied over to the destination folder along with the compiled files. 

## Helper Functions
All helper functions should live under the `./src/helpers` folder.

### K6 HTTP Wrapper Helper
The [Http.ts](.src/helpers/Http.js) helper is a wrapper for K6 HTTP. The reasoning behind this is to provide a way to easily apply "project wide" options easily, such as redirects, timeout, or the baseUrl/API that is being tested. These helper functions should be used instead of using K6 HTTP directly.

## Pre-Commit Tasks
- Before you commit and changes you will run `yarn lint` and address any errors. You can also run `yarn lint:fix` to try to automatically fix any errors.

## Transpiling and Bundling

By default, k6 can only run ES5.1 JavaScript code. To use TypeScript, we have to set up a bundler that converts TypeScript to JavaScript code. 

This project uses `Babel` and `Webpack` to bundle the different files - using the configuration of the [`webpack.config.js`](./webpack.config.js) file.

If you want to learn more, check out [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).