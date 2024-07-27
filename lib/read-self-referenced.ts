import path from "path"
import { findPackageJsonLimitedDepth } from "./read-self-package"

export function readSelfReferenced(name: string, basedir: string) {
  const packageJSON = findPackageJsonLimitedDepth(basedir)
  if (!packageJSON || !name.startsWith(packageJSON.source.name)) {
    return
  }
  const dir = path.dirname(packageJSON.file)
  if (name === packageJSON.source.name)
    return path.resolve(dir, packageJSON.source.main)
  return path.resolve(dir, '../', name)
}