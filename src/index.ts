import * as fs from "fs";

enum DependType {
  dependencies = "dependencies",
  devDependencies = "devDependencies",
}

interface Options {
  package: PackageFileType;
  node_modules: string;
}

type PackageFileType = string;

interface Package {
  readonly dependencies: any;
  readonly devDependencies: any;
}

interface Author {
  name: string;
  email: string;
}

interface Packages {
  author: string | Author | undefined;
  name: string | undefined;
  version: string | undefined;
  description: string | undefined;
  repository: string | undefined;
  license: string | undefined;
  homepage: string | undefined;
}

class PackageDependList {
  private packageFile: PackageFileType;
  private nodeModulesFolder: string;
  private outputArray: Array<Packages>;

  public constructor(options: Options) {
    this.packageFile = options.package;
    this.nodeModulesFolder = options.node_modules;
    this.outputArray = [];
  }

  private core(type: DependType): Array<Packages> {
    const pkgDepend = JSON.parse(fs.readFileSync(this.packageFile, "utf8"));
    const getKeys = Object.keys(pkgDepend[type]);

    getKeys.forEach((element?: any) => {
      const packagePath = `${this.nodeModulesFolder}/${element}/package.json`;
      const getPackage = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
      const { author, name, version, description, repository, license, homepage }: Packages = getPackage;
      this.outputArray.push({
        name: name,
        description: description,
        author: author,
        version: version,
        license: license,
        homepage: homepage,
        repository: `https://www.npmjs.com/package/${name}`,
      });
    });

    return this.outputArray;
  }

  public dependencies(): Omit<this, "dependencies" | "devDependencies"> {
    this.core(DependType.dependencies);
    return this;
  }

  public devDependencies(): Omit<this, "dependencies" | "devDependencies"> {
    this.core(DependType.devDependencies);
    return this;
  }

  public toJSONString(): string {
    return JSON.stringify(this, null, 4);
  }

  public get json(): Array<Packages> {
    return this.outputArray;
  }
}

export { PackageDependList, DependType };
