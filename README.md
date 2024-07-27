## resolve-import-path

> Obtain the path of the software packages you have installed, including your own software packages

```ts
import { resolveImport } from 'resolve-import-path'

resolveImport('react') // ...node_modules/react/dist/index.js

resolveImport('react/package.json') // ...node_modules/react/package.json

resolveImport('your-package-name/package.json') // ...package.json
```

## Related

> TODO