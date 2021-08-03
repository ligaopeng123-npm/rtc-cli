/**********************************************************************
 *
 * @模块名称: cmd
 *
 * @模块用途: cmd
 *
 * @date: 2021/8/3 14:23
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {spawn, SpawnOptions} from 'child_process'

/**
 * 命令执行
 * @param command
 * @param args
 * @param options
 */
export const exec = (command: string, args: string[], options: SpawnOptions): Promise<void> => new Promise((resolve, reject) => {
	spawn(command, args, options)
		.on('error', reject)
		.on('exit', code => {
			if (code === 0) return resolve();
			reject(new Error(`Failed to execute ${command} command.`))
		})
});
