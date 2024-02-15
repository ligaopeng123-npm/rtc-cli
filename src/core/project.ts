/**********************************************************************
 *
 * @模块名称: project
 *
 * @模块用途: project  根据用户输入获取项目信息
 *
 * @date: 2021/8/2 16:46
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import path from 'path'
import prompts from 'prompts'
import { Context, Project } from "../typing";
import { lowerCamelCase, upperCamelCase } from "@gaopeng123/utils";

/**
 * 处理项目信息 添加默认值
 * @param ctx
 */
export const processor = (item: Project, ctx: Context) => {
    switch (item.name) {
        case 'name':
            item.initial = item.initial || path.basename(ctx.destCwd);
            break;
        case 'title':
            item.initial = item.initial || `管理系统`;
            break;
        case 'description':
            item.initial = item.initial || `描述信息`;
            break;
        case 'version':
            item.initial = item.initial || '0.1.0';
            break;
        default:
            break;
    }
};
/**
 * 基础模板
 * @param ctx
 * @param project
 */
const projectFn = async (ctx: Context, project?: Array<any>): Promise<void> => {
    // 默认配置
    if (!ctx.project) {
        ctx.project = project || [
            { name: 'name', type: 'text', message: `Project name(${ctx.template})` },
            { name: 'title', type: 'text', message: 'Project title(管理系统)' },
            { name: 'description', type: 'text', message: 'Project description(描述信息)' },
            { name: 'version', type: 'text', message: 'version(0.1.0)' },
        ];
    }
    if (Array.isArray(ctx.project)) {
        ctx.project.forEach(async (item: Project) => {
            return await processor(item, ctx);
        });


        /* istanbul ignore next */
        const onCancel = (): never => {
            throw new Error('You have cancelled this task.');
        };
        /**
         * 处理用户输入
         */
        const answers = await prompts(ctx.project, { onCancel });
        /**
         * 将结果copy到projectAnswers上
         */
        ctx.answers.project = Object.assign({}, ctx.answers.project, answers, {
            // 保存大小驼峰命名字段 用户后续替换模板命名
            lowerCamelName: lowerCamelCase(answers.name),
            upperCamelName: upperCamelCase(answers.name)
        });
    }
}
/**
 * 模块的录入
 * @param ctx
 */
export const moduleProject = async (ctx: Context) => {
    await projectFn(ctx, [
        { name: 'name', type: 'text', message: `Module name(${ctx.template})` },
        { name: 'description', type: 'text', message: 'Module description(描述信息)' },
        { name: 'version', type: 'text', message: 'version(0.1.0)' },
    ]);
}
/**
 * Inquire template prompts.
 */
export default projectFn;
