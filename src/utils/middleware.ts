/**********************************************************************
 *
 * @模块名称: middleware
 *
 * @模块用途: middleware
 *
 * @date: 2021/8/2 9:10
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export type MiddlewareType<T> = (state: T) => Promise<void> | void

class Middleware<T> {
	private readonly middlewares: Array<MiddlewareType<T>> = [];
	
	/**
	 * 使用中间件
	 * @param middleware
	 */
	use(middleware: MiddlewareType<T>): Middleware<T> {
		this.middlewares.push(middleware);
		return this
	}
	
	/**
	 * 执行中间件
	 * @param state
	 */
	run(state: T): Promise<void> {
		return this.middlewares.reduce(
			(prev, current) => prev.then(() => current(state)),
			Promise.resolve()
		)
	}
}

export default Middleware;
