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
import check from "../core/check";
import choose from './choose';
import download from "../core/download";
import project from "../core/project";
import template from "../core/template";
import install from "../core/install";
import context from "../core/context";
import images from "../core/images";

// 中间件管理
const middleware = new Middleware<Context>();

middleware
/**
 * 检查目录是否存在
 */
	.use(check)
	/**
	 * 处理用户选择
	 */
	.use(choose)
	/**
	 * 用户输入的项目信息
	 */
	.use(project)
	/**
	 * 下载git模板代码
	 */
	.use(images)
	/**
	 * 安装依赖
	 */
	.use(download)
	/**
	 * 根据用户输入信息 替换模板变量
	 */
	.use(template)
	/**
	 * 镜像管理服务
	 */
	
	.use(install);

const app = async (tpl: string): Promise<void> => {
	// required arguments
	if (tpl == null || tpl === '') {
		throw new Error('模板字段不存在 请输出模板名称！');
		return;
	}
	/**
	 * 启动中间件 开始执行
	 */
	await middleware.run(context(tpl))
};

export default app;
