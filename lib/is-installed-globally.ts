import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import globalDirectory from 'global-directory';
import isPathInside from 'is-path-inside';

const dirname = typeof __dirname !== 'undefined' 
 ? __dirname
 : path.dirname(fileURLToPath(import.meta.url))

const isInstalledGlobally = (() => {
	try {
		return (
			isPathInside(dirname, globalDirectory.yarn.packages)
			|| isPathInside(dirname, fs.realpathSync(globalDirectory.npm.packages))
		);
	} catch {
		return false;
	}
})();

export default isInstalledGlobally;
