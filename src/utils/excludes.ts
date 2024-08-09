/**********************************************************************
 *
 * @模块名称: excludes
 *
 * @模块作用: excludes
 *
 * @创建人: pgli
 *
 * @date: 2024/8/10 1:56 上午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export const excludes = (title: string) => {
    const excludesEnum: Record<string, Array<string>>  = {
        'web-component': ['chokidarStyles.js'],
    }
    return excludesEnum[title];
}