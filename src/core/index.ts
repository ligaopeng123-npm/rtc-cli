/**********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: 模块入口
 *
 * @date: 2021/8/2 9:41
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import Middleware from '../utils/middleware'
import {Context} from '../typing';
import choose from './choose';
import download from "./download";
import project from "./project";
import template from "./template";
import install from "./install";
import listFn from "./list";

// 中间件管理
const middleware = new Middleware<Context>();

middleware
/**
 * 检查目录是否存在
 */
	.use(choose)
	/**
	 * 用户输入的项目信息
	 */
	.use(project)
	/**
	 * 下载git模板代码
	 */
	.use(download)
	/**
	 * 根据用户输入信息 替换模板变量
	 */
	.use(template)
	/**
	 * 安装依赖
	 */
	.use(install);

export default async (tpl: string): Promise<void> => {
	// required arguments
	if (tpl == null || tpl === '') {
		throw new Error('模板字段不存在 请输出模板名称！');
		return;
	}
	
	// create context
	const context: Context = {
		template: tpl,
		project: null, // 默认问题
		answers: {
			project: null,
			template: {
				git: ''
			},
			install: "npm",
		}, // 项目信息回答
		gitUrl: '',
		destCwd: '', // 目标文件
		filesPath: [], // 文件目录
	};
	/**
	 * 启动中间件 开始执行
	 */
	await middleware.run(context)
};

/**
 * ls命令
 * @param tpl
 */
export const list = async (): Promise<void> => {
	await listFn();
};
