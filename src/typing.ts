/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: typing  定义类型系统
 *
 * @date: 2021/8/2 9:10
 *
 * @版权所有: pgli
 *
 **********************************************************************/

import {PromptObject} from "prompts";

export interface Template {
	git: string;
}

export type Install = 'npm' | 'yarn' | 'cnpm';

export interface Answers {
	project?: object | null; // 项目信息
	template: Template; // 模板信息
	install?: Install; // 编译选择信息
}

export type Router = {
	name: string; // 路由名称
	path: string; // 路由地址
} | null;

/**
 * 上下文对象
 */
export interface Context {
	destCwd: string; // 输出目录
	template: string; // 模板名称
	project: Array<Project> | null; // 项目信息
	answers: Answers; // 项目信息
	filesPath: Array<TemplateContents>; // 文件目录
	router?: Router; // 路由信息
	[propName: string]: any;
}

/**
 * 模板属性
 */
export type Project = {
	name: string;
	type: string,
	message: string;
	initial?: any; // 默认值
	validate?: any; // 校验函数
} & PromptObject;

/**
 * 模板信息
 */
export interface TemplateContents {
	path: string;
	contents: Uint8Array
}

