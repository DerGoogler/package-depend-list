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

// Prints as JSON
console.log(pkg.devDependencies().json);
// Prints as JSON string
console.log(pkg.devDependencies().toJSONString());
```
