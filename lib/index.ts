import path, { join } from 'node:path'
import isInstalledGlobally from './is-installed-globally'
import globalDirs from 'global-directory'
import resolve from 'resolve'
import consola from 'consola'
import { readSelfReferenced } from './read-self-referenced'
import { caller } from './caller'


export function resolveImport(
  importName: string,
  ensure = false,
  resolveOptions: resolve.SyncOpts = { preserveSymlinks: false }
) {
  const basedir = resolveOptions.basedir || path.dirname(caller())
  try {
    return resolve.sync(importName, { ...resolveOptions, basedir })
  }
  catch (error) {
    const selfPackagePath = readSelfReferenced(importName, basedir)
    if (selfPackagePath)
      return selfPackagePath
    else
      consola.log(error)
  }

  if (isInstalledGlobally) {
    try {
      return require.resolve(join(globalDirs.yarn.packages, importName))
    }
    catch { }

    try {
      return require.resolve(join(globalDirs.npm.packages, importName))
    }
    catch { }
  }

  if (ensure)
    throw new Error(`Failed to resolve package ${importName}`)

  consola.error(`Failed to resolve package ${importName}`)
  return undefined
}
