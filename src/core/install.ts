/**********************************************************************
 *
 * @模块名称: install
 *
 * @模块用途: install  下载项目依赖
 *
 * @date: 2021/8/3 12:35
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import chalk from "chalk";
import {exec} from "../utils/cmd";
import {Context, TemplateContents} from "../typing";

const install = async (ctx: Context): Promise<void> => {
	/**
	 * 检查package.json是否存在
	 */
	if (ctx.filesPath.find((item: TemplateContents) => item.path === 'package.json') === null) {
		return;
	}
	
	try {
		const client = ctx.answers.install || 'npm';
		/**
		 * 检查系统类型 win和苹果 linux执行文件不一样
		 */
		const cmd = process.platform === 'win32' ? client + '.cmd' : client;
		await exec(cmd, ['install'], {cwd: ctx.destCwd, stdio: 'inherit'});
		console.log(chalk.green(`dir ${ctx.template}`));
		console.log(chalk.green(`${client} start`));
	} catch (e) {
		throw new Error('Install dependencies failed.')
	}
};

export default install;
