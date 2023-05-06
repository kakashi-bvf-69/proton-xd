export default interface Config {
  permissions: Permissions;
}

export interface Permissions {
  env: string[]|boolean;
  sys: string[]|boolean;
  hrtime: boolean;
  net: string[]|boolean;
  ffi: boolean;
  read: string[]|boolean;
  run: string[]|boolean;
  write: string[]|boolean;
}

export interface NPMPackage {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: {
    [script: string]: string;
  };
  keywords: string[];
  author: string;
  license: string;
}
