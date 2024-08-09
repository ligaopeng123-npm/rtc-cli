/**********************************************************************
 *
 * @模块名称: editTemplate
 *
 * @模块用途: editTemplate  根据需要修改模板内容
 *
 * @date: 2021/8/3 8:41
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import path from "path";
import {
    editTemplate,
    editTemplateErrorFile,
    fileContents,
    filePath,
    writeFile
} from "../utils/file";
import { Context } from "../typing";
import { excludes } from "../utils/excludes";

const template = async (ctx: Context): Promise<void> => {
    /**
     * 用户回答信息
     */
    const answers = Object.assign({}, ctx.answers.project, ctx.answers.images);
    if (!answers) return;
    const cwd = ctx.destCwd;
    /**
     * 获取文件目录
     */
    const entries = await filePath(cwd, excludes(ctx.answers.template.title));
    /**
     * 获取文件内容
     */
    const allContents = await fileContents(entries, cwd);
    const contents = allContents;
    /**
     * 过滤掉图片 图片不需要做处理 在filePath中过滤
     */
    // const contents = allContents.filter((item) => {
    //     const filepath = item.path;
    //     console.log('filepath', filepath)
    //     const imgTypes = ['bmp', 'jpg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg',
    //         'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'avif', 'apng',
    //         'ttf', 'pem'];
    //     const currentFile = imgTypes.filter((str) => {
    //         return filepath.endsWith(`.${str}`);
    //     });
    //     return currentFile.length === 0;
    // });
    /**
     * 存储项目目录
     */
    ctx.filesPath = contents;
    await Promise.all(contents.map(async (item: any) => {
        return await writeFile(path.join(cwd, item.path),
            editTemplate(item.contents, answers, (contents) => {
                if (item.path?.endsWith('Dockerfile') || item.path?.endsWith('Make.def') || item.path?.endsWith('.txt')) {
                    return editTemplateErrorFile(contents, answers);
                }
                return contents;
            }))
    }));
};

export default template;
