
/**********************************************************************
 *
 * @模块名称: test
 *
 * @模块作用: test
 *
 * @创建人: pgli
 *
 * @date: 2024/8/10 12:45 上午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import path from "path";
import { editTemplate, readFile, writeFile } from "./file";
const test = async ()=>  {
    const contents = await readFile(path.join(__dirname, './chokidarStyles.js'));
    await writeFile(path.join(__dirname, './chokidarStyles.js'),
        editTemplate(contents, {upperCamelName: 'ATest'}, (contents: any) => {
            return contents;
        }));
}

// test();