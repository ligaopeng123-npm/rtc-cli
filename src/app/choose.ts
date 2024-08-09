/**********************************************************************
 *
 * @模块名称: choose
 *
 * @模块用途: choose  用户模板选择管理
 *
 * @date: 2021/8/2 9:07
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import prompts from 'prompts';
import { Context, Install, Template } from "../typing";
import { getGitDownloadUlr } from "../utils/file";

/**
 * git 地址
 */
const git = async (): Promise<Template> => {
    const choices = [
        {
            title: 'react-simple',
            value: getGitDownloadUlr('react-simple'),
            description: '中后台管理系统'
        },
        {
            title: 'react-screen',
            value: getGitDownloadUlr('react-screen'),
            description: '大屏报表系统'
        },
        {
            title: 'react-electron',
            value: getGitDownloadUlr('react-electron'),
            description: 'electron客户端'
        },
        {
            title: 'flutter-repo',
            value: getGitDownloadUlr('flutter-repo'),
            description: 'flutter应用'
        },
        {
            title: 'components-repo',
            value: getGitDownloadUlr('components-repo'),
            description: 'monorepo组件库'
        },
        {
            title: 'function-repo',
            value: getGitDownloadUlr('function-repo'),
            description: 'monorepo函数库'
        }
    ]
    const {choose}: { choose?: string } = await prompts([
        {
            name: 'choose',
            type: 'select',
            message: `Please choose the template to create`,
            hint: ' ',
            choices: choices
        }
    ]);
    const template = choices.find(item => item.value === choose) as Template;
    return {
        ...template,
        git: template.value
    };
};
/**
 * 安装途径选择
 */
const install = async (): Promise<Install> => {
    const choices = [
        {
            title: 'npm',
            value: 'npm'
        },
        {
            title: 'pnpm',
            value: 'pnpm'
        },
        {
            title: 'yarn',
            value: 'yarn'
        },
        {
            title: 'cnpm',
            value: 'cnpm'
        },
    ]
    const {choose}: { choose?: string } = await prompts([
        {
            name: 'choose',
            type: 'select',
            message: `Please choose the installation method`,
            hint: ' ',
            choices: choices
        }
    ]);
    return choose as Install;
};

const choose = async (ctx: Context): Promise<void> => {
    // 选择git路径
    ctx.answers.template = await git();
    // 选择依赖下载途径
    ctx.answers.install = await install();
};

export default choose;
