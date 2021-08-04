/**********************************************************************
 *
 * @模块名称: check
 *
 * @模块用途: check  检查文件目录是否存在
 *
 * @date: 2021/8/4 8:49
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import path from 'path'
import prompts from 'prompts';
import chalk from "chalk";
import {Context} from "../typing";
import {exists, remove} from "../utils/file";

const check = async (ctx: Context): Promise<void> => {
	console.clear();
	/**
	 * 根据template名称 设置当前的文件名称
	 */
	ctx.destCwd = path.resolve(ctx.template);
	/**
	 * 如果文件夹存在 则给出选择 是创建还是覆盖
	 */
	const isExists = await exists(ctx.destCwd);
	if (isExists) {
		const {sure} = await prompts([
			{
				name: 'sure',
				type: 'confirm',
				message: chalk.blue(`当前存在文件夹${ctx.template}，是否覆盖？`)
			}
		]);
		if (sure) {
			await remove(ctx.destCwd);
		} else {
			throw new Error(chalk.yellow(`目前文件存在，请检查当前文件夹。`));
		}
	}
};

export default check;
