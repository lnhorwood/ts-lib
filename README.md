# @horwood/ts-lib
This is a simple Node.js module that produces a TypeScript library using your local tsconfig.json file. When built, an 
executable is produced that can be run from the command line.

## Getting Started
It is available through the NPM registry by using the following command:
```bash
$ npm install @horwood/ts-lib
```
### Running via the CLI
In order to run from the CLI, add a script to your package.json:
```json
{
  "name": "example-package",
  "version": "1.0.0",
  "description": "An example package.",
  "scripts": {
    "build": "ts-lib"
  },
  "devDependencies": {
    "@horwood/ts-lib": "^1.0.0"
  }
}
```
### Running programmatically
A GulpRunner class is provided that allows Gulp to be run programmatically.
```js
import { GulpRunner } from '@horwood/ts-lib';
const gulpDir = 'path/to/gulp/dir';
const task = 'compile';
new GulpRunner(gulpDir).execute(task);
``` 
Both 'gulpDir' and 'task' are optional parameters. If not provided, the standard gulpfile will be used and the default 
task will be run.
