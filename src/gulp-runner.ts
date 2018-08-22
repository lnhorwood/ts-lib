import {resolve} from "path";
import {execSync} from "child_process";
import {argv} from "yargs";

export class GulpRunner {

  private readonly _gulp: string;
  private readonly _gulpfileDir: string;

  constructor(gulpfileDir: string = resolve(__dirname, '..')) {
    if (!process.env.INIT_CWD) {
      process.env.INIT_CWD = process.cwd();
    }
    this._gulp = resolve(process.env.INIT_CWD, 'node_modules', '.bin', 'gulp');
    this._gulpfileDir = gulpfileDir;
  }

  execute(taskName: string = 'default'): Buffer {
    return execSync(`${this._gulp} ${argv.tsLibConf ? `--tsLibConf ${argv.tsLibConf}` : ''} --cwd ${this._gulpfileDir} ${taskName}`, {
      stdio: 'inherit'
    });
  }

}
