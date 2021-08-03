/**********************************************************************
 *
 * @模块名称: file
 *
 * @模块用途: file
 *
 * @date: 2021/8/3 11:15
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import glob from 'fast-glob';
import fs from 'fs';
import path from "path";
import template from 'lodash.template';
import {TemplateContents} from "../typing";

/**
 * 检查文件是否存在
 * @param input
 */
export const exists = async (input: string): Promise<false | 'file' | 'dir' | 'other'> => {
	try {
		const stat = await fs.promises.stat(input);
		/* istanbul ignore else */
		if (stat.isDirectory()) {
			return 'dir'
		} else if (stat.isFile()) {
			return 'file'
		} else {
			return 'other'
		}
	} catch (err) {
		/* istanbul ignore if */
		if (err.code !== 'ENOENT') {
			throw err
		}
		return false
	}
};

/**
 * 删除文件
 * @param input
 * @param options
 */
export const remove = async (input: string, options?: fs.RmDirOptions): Promise<void> => {
	const result = await exists(input);
	
	if (result === false) return;
	
	if (result !== 'dir') {
		return await fs.promises.unlink(input)
	}
	
	const entries = await fs.promises.readdir(input);
	
	await Promise.all(entries.map(async item => {
		await remove(path.join(input, item), options)
	}));
	
	await fs.promises.rmdir(input, options)
};

/**
 * 判断是否为空
 * @param input
 */
export const isEmpty = async (input: string): Promise<boolean> => {
	const files = await fs.promises.readdir(input);
	return files.length === 0
};

/**
 * 读取文件内容
 * @param input
 */
export const readFile = async (input: string): Promise<Buffer> => {
	return await fs.promises.readFile(input)
};
/**
 * 文件写入
 * @param input
 * @param contents
 */
export const writeFile = async (input: string, contents: string | Uint8Array): Promise<void> => {
	return await fs.promises.writeFile(input, contents)
};

/**
 * 读取文件路径
 * @param cwd
 */
export const filePath = async (cwd: string) => {
	return await glob(['**'], {
		cwd: cwd,
		ignore: ['*js.map', '*.js'],
		dot: true,
		deep: 5
	});
	
};

/**
 * 文件内容
 * @param path
 */
export const fileContents = async (entries: Array<string>, cwd: string): Promise<Array<TemplateContents>> => {
	return await Promise.all(entries.map(async (entry: string) => {
		const contents = await readFile(path.join(cwd, entry));
		return {path: entry, contents}
	}));
};
/**
 * 修改模板信息
 * @param contents
 * @param data
 */
export const editTemplate = (contents: Uint8Array, data: object): Uint8Array => {
	try {
		const text = contents.toString();
		const compiled: any = template(text);
		const newContents = compiled(data);
		return Buffer.from(newContents);
	} catch (e) {
		return contents;
	}
};
