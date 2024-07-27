import { join } from 'node:path'
import isInstalledGlobally from './is-installed-globally'
import globalDirs from 'global-directory'
import resolve from 'resolve'
import consola from 'consola'

export function resolveImport(importName: string, ensure?: true): string
export function resolveImport(importName: string, ensure = false, resolveOptions: resolve.SyncOpts = {
  preserveSymlinks: false,
}) {
  try {
    return resolve.sync(importName, resolveOptions)
  }
  catch (error) {
    consola.log(error)
  }

  if (isInstalledGlobally) {
    try {
      return require.resolve(join(globalDirs.yarn.packages, importName))
    }
    catch {}

    try {
      return require.resolve(join(globalDirs.npm.packages, importName))
    }
    catch {}
  }

  if (ensure)
    throw new Error(`Failed to resolve package ${importName}`)

  consola.error(`Failed to resolve package ${importName}`)
  return undefined
}
