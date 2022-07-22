import * as fs from "fs";
import { util } from "googlers-tools";

enum DependType {
  dependencies = "dependencies",
  devDependencies = "devDependencies",
}

interface Options {
  package: string;
  node_modules: string;
}

interface Author {
  name: string;
  email: string;
}

export interface Packages {
  author: string | Author | undefined;
  name: string | undefined;
  version: string | undefined;
  description: string | undefined;
  repository: string | undefined;
  license: string | undefined;
  homepage: string | undefined;
}

type OutArray = {
  dependencies: Array<Packages>;
  devDependencies: Array<Packages>;
};

type ParseOptions = true | false;

type ObjectType<T> = T extends false ? Array<Packages> : T extends true ? string : never;

class PackageDependList {
  private packageFile: string;
  private nodeModulesFolder: string;
  private outputArray: OutArray;

  public constructor(options: Options) {
    this.packageFile = options.package;
    this.nodeModulesFolder = options.node_modules;
    this.outputArray = {
      dependencies: [],
      devDependencies: [],
    };
  }

  private core(type: DependType): Array<Packages> {
    const pkgDepend = JSON.parse(fs.readFileSync(this.packageFile, "utf8"));
    const getKeys = Object.keys(pkgDepend[type]);

    getKeys.forEach((element?: any) => {
      const packagePath = `${this.nodeModulesFolder}/${element}/package.json`;
      const getPackage = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
      const { author, name, version, description, repository, license, homepage }: Packages = getPackage;
      this.outputArray[type].push({
        name: name,
        description: description,
        author: author,
        version: version,
        license: license,
        homepage: homepage,
        repository: `https://www.npmjs.com/package/${name}`,
      });
    });

    return this.outputArray[type];
  }

  /**
   * Gets the dependencies of the target package
   * @param toString Pases the array to an string
   * @returns String or object array
   */
  public dependencies<T extends ParseOptions>(toString?: T): ObjectType<T> {
    return toString ? JSON.stringify(this.core(DependType.dependencies)) : (this.core(DependType.dependencies) as any);
  }

  /**
   * Gets the devDependencies of the target package
   * @param toString Pases the array to an string
   * @returns String or object array
   */
  public devDependencies<T extends ParseOptions>(toString?: T): ObjectType<T> {
    return toString ? JSON.stringify(this.core(DependType.devDependencies)) : (this.core(DependType.devDependencies) as any);
  }

  /**
   * @deprecated This method has an wrong implementation
   */
  @util.deprecated("This method has an wrong implementation")
  public toJSONString(): void {}

  /**
   * @deprecated This method has an wrong implementation
   */
  @util.deprecated("This method has an wrong implementation")
  public json(): void {}
}

export { PackageDependList, DependType };
