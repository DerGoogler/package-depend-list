import { PackageDependList } from "./../src/index";
import * as path from "path";

const pkg = new PackageDependList({
  package: "./package.json",
  node_modules: path.resolve("./", "node_modules"),
});

// if `true`, get the array as a string
console.log(pkg.dependencies(true));
// if `false`, get output as js array
console.log(pkg.devDependencies(false));
