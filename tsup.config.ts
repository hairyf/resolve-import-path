import {defineConfig} from 'tsup'

const config = defineConfig([
  {
    entry: ['lib/index.ts'],
    external: ['ini'],
    noExternal: ['is-installed-globally', 'global-directory', 'is-path-inside'],
    format: ['cjs'],
    dts: true,
  },
  {
    entry: ['lib/index.ts'],
    format: ['esm'],
    
  }
])

export default config