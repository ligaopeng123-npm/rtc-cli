/**********************************************************************
 *
 * @模块名称: router
 *
 * @模块用途: router
 *
 * @date: 2021/8/13 10:26
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export const splicePath = (path: string, index: number): string => path ? `${path}-${index}` : `${index}`;
/**
 * 查找要匹配的位置
 * @param routers
 * @param matchFn
 * @param path
 */
export const matchRouter = (routers: Array<any>, matchFn: any, path = ''): any => {
	for (let index = 0; index < routers.length; index++) {
		const item = routers[index];
		if (matchFn(item)) {
			return splicePath(path, index);
		}
		if (item.children) {
			const matchPath: string = matchRouter(item.children, matchFn, splicePath(path, index));
			if (matchPath) return matchPath;
		}
	}
};
/**
 * 将菜单信息 push到menus.json
 * @param routers
 * @param path
 * @param item
 */
export const insertRouter = (routers: Array<any>, path: string, item: any): void => {
	const p: Array<number> = path.split('-').map(v => Number(v));
	if (p.length <= 1) {
		routers.push(item);
		return
	}
	if (p.length > 1) p.pop();
	const joinRouter = (router: Array<any> | any) => {
		if (p.length) {
			const index: any = p.shift();
			joinRouter((router || routers)[index] || (router || routers)['children'][index])
		} else {
			if (router?.children?.length) {
				router.children.push(item);
			} else {
				router.push(item);
			}
		}
	};
	joinRouter(routers);
};
/**
 * 添加到路由信息menus中
 * @param routers
 * @param path
 * @param router
 */
export const addRouter = (routers: Array<any>, path: string, router: any) => {
	const p = path.substr(0, path.lastIndexOf('/'));
	const math = matchRouter(routers, (item: any) => {
		return item?.component?.startsWith(p);
	});
	insertRouter(routers, math, router);
};
