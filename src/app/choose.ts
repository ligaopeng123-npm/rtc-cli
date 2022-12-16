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
import {Context, Install} from "../typing";

/**
 * git 地址
 */
const git = async (): Promise<string> => {
    const {choose}: { choose?: string } = await prompts([
        {
            name: 'choose',
            type: 'select',
            message: `Please choose the template to create`,
            hint: ' ',
            choices: [
                {
                    title: 'react-sample(Management system)',
                    value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-simple.zip'
                },
                {
                    title: 'react-screen(Large screen report)',
                    value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-screen.zip'
                },
                {
                    title: 'react-electron(Electron + react + ant)',
                    value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/react-electron.zip'
                },
                {
                	title: 'components-repo(pnpm+lerna)',
                	value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/components-repo.zip'
                },
                {
                    title: 'function-repo(pnpm+lerna)',
                	value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/function-repo.zip'
                },
                {
                    title: 'component',
                    value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/componentModule.zip'
                },
                {
                    title: 'function',
                    value: 'https://github.com/ligaopeng123/react-project-template/archive/refs/heads/functionModule.zip'
                }
            ]
        }
    ]);
    return choose as string;
};
/**
 * 安装途径选择
 */
const install = async (): Promise<Install> => {
    const {choose}: { choose?: string } = await prompts([
        {
            name: 'choose',
            type: 'select',
            message: `Please choose the installation method`,
            hint: ' ',
            choices: [
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
        }
    ]);
    return choose as Install;
};

const choose = async (ctx: Context): Promise<void> => {
    // 选择git路径
    ctx.answers.template.git = await git();
    // 选择依赖下载途径
    ctx.answers.install = await install();
};

export default choose;
