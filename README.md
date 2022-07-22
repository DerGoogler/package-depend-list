# Package Dependencies List

This package generates an list with all listed dependencies or devDependencies

## Install

```bash
# With NPM
npm add package-depend-list
# With Yarn
yarn add package-depend-list
# With bun
bun add package-depend-list
# In some cases you'll need tslib, do this by:
npm add --save-dev tslib
```

## Setup

> Library cannot run with an Webpack production

```ts
import { PackageDependList } from "package-depend-list";
import * as path from "path";

const pkg = new PackageDependList({
  package: "./package.json",
  node_modules: path.resolve("./", "node_modules"),
});

// if `true`, get the array as a string
console.log(pkg.dependencies(true));
// if `false`, get output as js array
console.log(pkg.devDependencies(false));
```
