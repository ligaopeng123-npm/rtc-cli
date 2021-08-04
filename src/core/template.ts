/**********************************************************************
 *
 * @模块名称: editTemplate
 *
 * @模块用途: editTemplate  根据需要修改模板内容
 *
 * @date: 2021/8/3 8:41
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import path from "path";
import {editTemplate, fileContents, filePath, writeFile} from "../utils/file";
import {Context} from "../typing";

const template = async (ctx: Context): Promise<void> => {
	/**
	 * 用户回答信息
	 */
	const answers = ctx.answers.project;
	if (!answers) return;
	const cwd = ctx.destCwd;
	/**
	 * 获取文件目录
	 */
	const entries = await filePath(cwd);
	/**
	 * 获取文件内容
	 */
	const contents = await fileContents(entries, cwd);
	/**
	 * 存储项目目录
	 */
	ctx.filesPath = contents;
	await Promise.all(contents.map(async (item: any) => {
		return await writeFile(path.join(cwd, item.path), editTemplate(item.contents, answers))
	}));
};

export default template;
