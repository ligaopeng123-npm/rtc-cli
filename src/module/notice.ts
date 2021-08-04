/**********************************************************************
 *
 * @模块名称: notice
 *
 * @模块用途: notice  通知信息模块
 *
 * @date: 2021/8/4 16:19
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {Context} from "../typing";
import chalk from "chalk";

const notice = async (ctx: Context): Promise<void> => {
	console.log(chalk.green(`Successfully created ${chalk.greenBright(ctx.template)} module`));
};

export default notice;
