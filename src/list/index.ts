/**********************************************************************
 *
 * @模块名称: list
 *
 * @模块用途: list  查看支持的命令
 *
 * @date: 2021/8/3 19:09
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import chalk from "chalk";

const cmdChalk = (str: string) => chalk.dim(chalk.blueBright(str));
const list = async (): Promise<void> => {
	console.log(cmdChalk(`rtc create <template>`));
	console.log(cmdChalk(`rtc c <template>`));
	console.log(cmdChalk(`rtc createModule`));
	console.log(cmdChalk(`rtc cm <template>`));
	console.log(cmdChalk(`rtc list`));
	console.log(cmdChalk(`rtc ls <template>`));
};

export default list;
