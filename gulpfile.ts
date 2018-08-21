import { dest, series, src, task } from 'gulp';
import install from 'gulp-install';
import {createProject, Project} from "gulp-typescript";
import {resolve} from "path";
import del from 'del';

const tsProject: Project = createProject(resolve(process.env.INIT_CWD, 'tsconfig.json'));
const dist: string = resolve(process.env.INIT_CWD, 'dist');
const staticFiles: string[] = [
  resolve(process.env.INIT_CWD, 'package.json')
];

task('clean', () => del(dist, {
  force: true
}));

task('compile', () => {
  return tsProject.src().pipe(tsProject()).pipe(dest(dist));
});

task('copy', () => src(staticFiles).pipe(dest(dist)).pipe(install({
  production: true
})));

task('default', series('clean', 'compile', 'copy'));
