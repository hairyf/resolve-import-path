import path from 'node:path'
import fs from 'node:fs'

export function findPackageJsonLimitedDepth(dir: string, depth = 10) {
  while (dir !== '/' && depth > 0) {
    const files = fs.readdirSync(dir);
    if (files.includes('package.json')) {
      const _path = path.join(dir, 'package.json')
      const _json = JSON.parse(fs.readFileSync(_path, 'utf-8'))
      return { source: _json, file: _path }
    }
    dir = path.dirname(dir);
    depth--;
  }
  return undefined;
}