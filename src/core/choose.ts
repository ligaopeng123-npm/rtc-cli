/**********************************************************************
 *
 * @模块名称: choose
 *
 * @模块用途: choose  用户模板选择管理
 *
 * @date: 2021/8/2 9:07
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import path from 'path'
import prompts from 'prompts';
import chalk from "chalk";
import {Context, Install} from "../typing";
import {exists, remove} from "../utils/file";

/**
 * git 地址
 */
const git = async (): Promise<string> => {
	const {choose}: { choose?: string } = await prompts([
		{
			name: 'choose',
			type: 'select',
			message: `Please choose the created template`,
			hint: ' ',
			choices: [
				{
					title: 'react-sample(Management system)',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-simple.zip'
				},
				{
					title: 'react-screen(Large screen report)',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-simple.zip'
				},
				{
					title: 'react-component(Component template)',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-simple.zip'
				},
				{
					title: 'react-module(Module template)',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-simple.zip'
				},
				{
					title: 'react-mobile(Mobile template)',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-simple.zip'
				},
			]
		}
	]);
	return choose as string;
};
/**
 * 安装途径选择
 */
const install = async (): Promise<Install> => {
	const {choose}: { choose?: string } = await prompts([
		{
			name: 'choose',
			type: 'select',
			message: `Please choose the installation method`,
			hint: ' ',
			choices: [
				{
					title: 'npm',
					value: 'npm'
				},
				{
					title: 'yarn',
					value: 'yarn'
				},
				{
					title: 'cnpm',
					value: 'cnpm'
				},
			]
		}
	]);
	return choose as Install;
};

const choose = async (ctx: Context): Promise<void> => {
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
			ctx.answers.template.git = await git();
		} else {
			throw new Error(chalk.yellow(`目前文件存在，请检查当前文件夹。`));
			return;
		}
	} else {
		ctx.answers.template.git = await git();
	}
	
	ctx.answers.install = await install();
};

export default choose;
