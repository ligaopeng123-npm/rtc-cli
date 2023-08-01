/**********************************************************************
 *
 * @模块名称: module
 *
 * @模块用途: module
 *
 * @date: 2021/8/4 8:39
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import Middleware from '../utils/middleware'
import { Context } from '../typing';
import check from "../core/check";
import choose from './choose';
import download from "../core/download";
import rename from "../core/rename";
import template from "../core/template";
import context from "../core/context";
import notice from "./notice";
import router from "./router";
import { moduleProject } from "../core/project";

// 中间件管理
const middleware = new Middleware<Context>();

middleware
    /**
     * 检查目录是否存在
     */
    .use(check)
    /**
     * 用户选择
     */
    .use(choose)
    /**
     * 用户输入的项目信息
     */
    .use(moduleProject)
    /**
     * 下载git模板代码
     */
    .use(download)
    /**
     * 修改文件名
     */
    .use(rename)
    /**
     * 根据用户输入信息 替换模板变量
     */
    .use(template)
    /**
     * 给用户的信息
     */
    .use(notice)
    /**
     * 添加路由信息
     */
    .use(router);

const module = async (tpl: string): Promise<void> => {
    // required arguments
    if (tpl == null || tpl === '') {
        throw new Error('模板字段不存在 请输出模板名称！');
        return;
    }
    // /^(?:[A-Z][a-z]+)+$/.test(tpl) // 驼峰命名
    /**
     * 启动中间件 开始执行
     */
    await middleware.run(context(tpl))
};
export default module;
