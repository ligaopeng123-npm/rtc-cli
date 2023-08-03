/**********************************************************************
 *
 * @模块名称: downloadTemplate
 *
 * @模块用途: downloadTemplate  根据gitUrl下载远端模板
 *
 * @date: 2021/8/2 15:29
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import download from 'download-git-repo';
import ora from 'ora';
import chalk from "chalk";
import {Context} from "../typing";
import { GIT_TEMPLATE_IS_CLONE } from "../utils/file";

const gitDownload = (ctx: Context): Promise<any> => {
	return new Promise((resolve) => {
		const spinner = ora(chalk.blueBright('模板下载中...')).start();
		download(
			`direct:${ctx.answers.template.git}`,
			ctx.destCwd,
			{clone: GIT_TEMPLATE_IS_CLONE},
			(err: Error) => {
				err ? spinner.fail(chalk.red(`模板下载失败！${err}`)) : spinner.succeed(chalk.green("模板下载成功!"));
				spinner.stop();
				resolve(err);
			}
		);
	})
};

const downloadTemplate = async (ctx: Context): Promise<void> => {
	const state = await gitDownload(ctx);
	if (state) throw new Error(state);
};
export default downloadTemplate;
