import path, { join } from 'node:path'
import isInstalledGlobally from './is-installed-globally'
import globalDirs from 'global-directory'
import resolve from 'resolve'
import consola from 'consola'
import { readSelfReferenced } from './read-self-referenced'
import { caller } from './caller'


export function resolveImport(importName: string, ensure?: true, resolveOptions?: resolve.SyncOpts): string
export function resolveImport(importName: string, ensure?: false, resolveOptions?: resolve.SyncOpts): string | undefined
export function resolveImport(
  importName: string,
  ensure = false,
  resolveOptions: resolve.SyncOpts = { preserveSymlinks: false }
) {
  const basedir = resolveOptions.basedir || path.dirname(caller())
  let tryError
  try {
    return resolve.sync(importName, { ...resolveOptions, basedir })
  }
  catch (error) { tryError = error }

  if (isInstalledGlobally) {
    try {
      return require.resolve(join(globalDirs.yarn.packages, importName))
    }
    catch (error){ tryError = error }

    try {
      return require.resolve(join(globalDirs.npm.packages, importName))
    }
    catch (error){ tryError = error }
  }

  const selfPackagePath = readSelfReferenced(importName, basedir)
  if (selfPackagePath)
    return selfPackagePath

  if (ensure) {
    consola.log(tryError)
    throw new Error(`Failed to resolve package ${importName}`)
  }

  return undefined
}
