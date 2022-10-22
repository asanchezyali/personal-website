import fs from "fs";
import path from "path";

const pipe =
  (...fns: any) =>
  (x: any) =>
    fns.reduce((v: any, f: any) => f(v), x);

const flattenArray = (input: any) =>
  input.reduce(
    (acc: any, item: any) => [...acc, ...(Array.isArray(item) ? item : [item])],
    []
  );

const map = (fn: any) => (input: any) => input.map(fn);

const walkDir = (fullPath: string) => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllfilesRecursively(fullPath);
};

const pathJoinPrefix = (prefix: string) => (extraPath: string) =>
  path.join(prefix, extraPath);

const getAllfilesRecursively = (folder: string) =>
  pipe(
    fs.readdirSync,
    map(pipe(pathJoinPrefix(folder), walkDir)),
    flattenArray
  )(folder);

export default getAllfilesRecursively;