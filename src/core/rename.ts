/**********************************************************************
 *
 * @模块名称: rename
 *
 * @模块用途: rename  修改文件名 此处处理模块创建逻辑
 *
 * @date: 2021/8/3 9:07
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import path from "path";
import {Context} from "../typing";
import {editPath, filePath, rename} from "../utils/file";

const _rename = async (ctx: Context): Promise<void> => {
	const cwd = ctx.destCwd;
	/**
	 * 获取文件目录
	 */
	const entries = await filePath(cwd);
	await Promise.all(entries.map(async (item: any) => {
		const answers = ctx.answers.project;
		const newPath = editPath(item, answers);
		await rename(path.join(cwd, item), path.join(cwd, newPath));
		return newPath
	}));
};

export default _rename;
