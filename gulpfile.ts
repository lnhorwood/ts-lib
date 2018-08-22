import {dest, series, src, task} from 'gulp';
import install from 'gulp-install';
import {createProject, Project} from "gulp-typescript";
import {resolve} from "path";
import del from 'del';
import yargs, {Arguments} from 'yargs';
import {TsLibConf} from "./src";
import {existsSync} from "fs";

const argv: Arguments = yargs
  .default('tsLibConf', 'ts-lib-conf.json')
  .config('tsLibConf', configPath => {
    const fullConfigPath: string = resolve(process.env.INIT_CWD, configPath);
    if (existsSync(fullConfigPath)) {
      const tsLibConf: TsLibConf = require(fullConfigPath);
      tsLibConf.staticFiles ? tsLibConf.staticFiles = tsLibConf.staticFiles.map(staticFile => resolve(process.env.INIT_CWD, staticFile)) : [];
      return tsLibConf;
    }
    return {
      "staticFiles": [
        resolve(process.env.INIT_CWD, 'package.json'),
        resolve(process.env.INIT_CWD, 'README.md')
      ]
    };
  })
  .argv;

const tsProject: Project = createProject(resolve(process.env.INIT_CWD, 'tsconfig.json'));
const dist: string = resolve(process.env.INIT_CWD, 'dist');

task('clean', () => del(dist, {
  force: true
}));

task('compile', () => {
  return tsProject.src().pipe(tsProject()).pipe(dest(dist));
});

task('copy', () => src(argv.staticFiles).pipe(dest(dist)).pipe(install({
  production: true
})));

task('default', series('clean', 'compile', 'copy'));
