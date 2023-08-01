/**********************************************************************
 *
 * @模块名称: choose
 *
 * @模块用途: choose
 *
 * @date: 2021/8/4 8:46
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import prompts from "prompts";
import {Context} from "../typing";
import {username} from "../utils/file";
import {formatTimestamp} from "@gaopeng123/utils";

/**
 * git 地址
 */
const git = async (): Promise<string> => {
	const {choose}: { choose?: string } = await prompts([
		{
			name: 'choose',
			type: 'select',
			message: `Please select the module to be created`,
			hint: ' ',
			choices: [
				{
					title: 'table',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/table-module.zip',
					description: '简单表格'
				},
				{
					title: 'web-component',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/componentModule.zip',
					description: 'web-component组件'
				},
				{
					title: 'rc-component',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/RcComponentModule.zip',
					description: 'rc-component组件'
				},
				{
					title: 'function',
					value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/functionModule.zip',
					description: 'monorepo单函数'
				}
			]
		}
	]);
	return choose as string;
};


const choose = async (ctx: Context): Promise<void> => {
	// 选择git路径
	/**
	 * git路径
	 */
	ctx.answers.template.git = await git();
	/**
	 * 注入用户回答
	 */
	ctx.answers.project = Object.assign({}, ctx.answers.project, {
		// 根据用户回答 将命名规范为驼峰
		name: ctx.template.substr(0, 1).toLocaleUpperCase() + ctx.template.substring(1),
		username: username(),
		time: formatTimestamp(new Date()),
		escape: '${'
	});
};

export default choose;
