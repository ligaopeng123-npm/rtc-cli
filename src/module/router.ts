/**********************************************************************
 *
 * @模块名称: router
 *
 * @模块用途: router
 *
 * @date: 2021/8/12 19:14
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import prompts from "prompts";
import chalk from "chalk";
import {Context} from "../typing";
import path from "path";
import {readFile, writeFile} from "../utils/file";
import {addRouter} from "../utils/router";

const routerInfo = async (ctx: Context): Promise<any> => {
	const {sure} = await prompts([
		{
			name: 'sure',
			type: 'confirm',
			initial: 'no',
			message: chalk.blue(`Please confirm whether to add to the route？`)
		}
	]);
	if (sure) {
		/**
		 * 达到路径的后半段 前后分离
		 */
		const [path1, module] = ctx.destCwd.split('src');
		
		const menusUrl = path.join(path1, 'public/json/menus.json');
		/**
		 * 获取路径 根据路径 匹配路由信息 动态添加到当前模块中去
		 */
		const pathUrl = module.replace(/\\/g, "/").replace('/', '');
		
		ctx.router = await prompts([
			{name: 'name', type: 'text', initial: ctx.template, message: `Router name (${ctx.template})`},
			{name: 'path', type: 'text', initial: `/${pathUrl}`, message: `Router path (/${pathUrl})`},
		]);
		
		return {
			menusUrl,
			module,
			pathUrl
		}
	}
	ctx.router = null;
	return null;
};


const router = async (ctx: Context): Promise<void> => {
	/**
	 * 模板信息
	 */
	const _routerInfo = await routerInfo(ctx);
	if (ctx.router) {
		try {
			const {menusUrl, pathUrl} = _routerInfo;
			/**
			 * 获取文件信息
			 */
			const menusBuffer = await readFile(menusUrl);
			/**
			 * 转成json格式
			 */
			const menus = JSON.parse(menusBuffer.toString());
			/**
			 * 将路由信息 添加到路由文件中
			 */
			addRouter(menus, pathUrl,
				{
					"id": 53,
					"name": ctx.router.name || ctx.template,
					"path": ctx.router.path || `/${pathUrl}`,
					"component": pathUrl,
					"auth": null
				});
			await writeFile(menusUrl, JSON.stringify(menus, null, 4));
			console.log(chalk.greenBright(`Route added successfully`));
		} catch (e) {
		
		}
	}
};

export default router;
