/**********************************************************************
 *
 * @模块名称: context
 *
 * @模块用途: context  内容管理
 *
 * @date: 2021/8/4 8:57
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {Context} from "../typing";

const context = (tpl: string): Context => ({
	template: tpl,
	project: null, // 默认问题
	answers: {
		project: null,
		template: {
			git: ''
		},
		install: "npm",
	}, // 项目信息回答
	destCwd: '', // 目标文件
	filesPath: [], // 文件目录
});

export default context;
