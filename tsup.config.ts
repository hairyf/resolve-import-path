import {defineConfig} from 'tsup'

const config = defineConfig([
  {
    entry: ['lib/index.ts'],
    external: ['ini'],
    noExternal: ['is-installed-globally', 'global-directory'],
    format: ['cjs'],
    dts: true,
  },
  {
    entry: ['lib/index.ts'],
    format: ['esm'],
    
  }
])

export default config