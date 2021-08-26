/**********************************************************************
 *
 * @模块名称: images
 *
 * @模块用途: images  镜像服务管理
 *
 * @date: 2021/8/26 15:01
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import prompts from 'prompts'
import {Context, Images, Project} from "../typing";

/**
 * 处理项目信息 添加默认值
 * @param ctx
 */
export const processor = (item: Project, images: Images | undefined) => {
	switch (item.name) {
		case 'imagesUrl':
			item.initial = item.initial || images?.imagesUrl;
			break;
		case 'imagesMaintainer':
			item.initial = item.initial || images?.imagesMaintainer;
			break;
		default:
			break;
	}
};

/**
 * Inquire template prompts.
 */
export default async (ctx: Context): Promise<void> => {
	// 默认配置
	if (!ctx.images) {
		ctx.images = [
			{name: 'imagesUrl', type: 'text', message: `Image Service Address`},
			{name: 'imagesMaintainer', type: 'text', message: 'Image Service Manager'},
		];
		
		if (Array.isArray(ctx.images)) {
			ctx.images.forEach(async (item: Project) => {
				return await processor(item, ctx?.answers?.images);
			});
			
			/* istanbul ignore next */
			const onCancel = (): never => {
				throw new Error('You have cancelled this task.');
			};
			/**
			 * 处理用户输入
			 */
			const answers = await prompts(ctx.images, {onCancel});
			/**
			 * 将结果copy到projectAnswers上
			 */
			ctx.answers.images = Object.assign({}, ctx.answers.images, answers);
		}
	}
}
