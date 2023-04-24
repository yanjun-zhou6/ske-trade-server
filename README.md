# ske-2023Q2-trade-server

This is a project which created as a sever side while I join SKE event in my company EPAM. A simple example of Trading system to practise EngX culture that's promoted by EPAM.

## prerequisite

Please set up running environment via installing necessary software as `MongoDB`, `Node` in your computer.

## git started

To start this project, please run commands as follow.

```sh
npm install
npm run initDB
npm start
```

Install dependencies, then initialize dataset in MongoDB by running `initDB` script, and start it.

For `npm start` commit, there is three simple env variable `MODIFY_JOB`, `NEW_TRADE`, `UPDATE_TRADE` to controll whether launching job to modify trades by setting `MODIFY_JOB` true or false, anohter both boolen variable `NEW_TRADE`, `UPDATE_TRADE` is to determine if creating new trade, and updating trades which has exsited. You can check script details in the `package.json`

## Q&A

- what does the typeconfig option "lib" do?

  [What does the tsconfig option "lib" do?](https://stackoverflow.com/questions/39303385/what-does-the-tsconfig-option-lib-do)

- why we need to use typescript and babel both together

  [Why would I use TypeScript and Babel together?](https://stackoverflow.com/questions/44020689/why-would-i-use-typescript-and-babel-together)

  [Is babel still relevant for Typescript project?](https://dev.to/mbeaudru/is-babel-still-relevant-for-typescript-projects-36a7)

  key takeways as follows:

  - One important aspect of babel-preset-env I think you missed: Browser Polyfills. TypeScript can transpile syntax down for older browsers, but it won't add runtime code to support something like String.prototype.replaceAll() in IE11

  - keep tree-shaking feature working to avoid it mssing.

  [how to use ifelse in rxjs](https://pazel.dev/reduce-ifelse-using-rxjs)

## Reference

[How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)

[How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)

[Install MongoDB Community Edition on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition)

[mongosh](https://www.mongodb.com/docs/mongodb-shell/reference/editor-mode/)

[what is MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

[ws](https://github.com/websockets/ws)

[create a process with node fork](https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options)

[How To Launch Child Processes in Node.js](https://www.digitalocean.com/community/tutorials/how-to-launch-child-processes-in-node-js)

## issue

- lint-staged ignores tsconfig.json when it called through husky hooks

  https://github.com/okonet/lint-staged/issues/825
