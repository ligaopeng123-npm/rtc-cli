import cac from 'cac'
import {name, version} from '../package.json';
// 初始化
import init, {list} from './core';

const cli = cac('rtc');
/**
 * 创建create命令
 */
cli
	.command('create <template>', 'Create new project from a template')
	.alias('c')
	.option('-c', 'Create new project from a template')
	.example('rtc create app-test or rtc c app-test')
	.action(init);
/**
 * 开发模块命令
 */
/**
 * 创建list命令
 */
cli
	.command('list', 'Show all commands')
	.alias('ls')
	.option('-l', 'Show all commands')
	.example('rtc ls')
	.action(list);
/**
 * 创建帮助信息
 */
cli.help().version(version).parse();

const onError = (err: Error): void => {
	console.error(err.message);
	process.exit(1)
};

process.on('uncaughtException', onError);
process.on('unhandledRejection', onError);
