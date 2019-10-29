/*
 * @Author: 吴占超
 * @Date: 2019-08-09 11:27:35
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-09 13:51:17
 */
export declare class EggCache {
  /**
   * 获取缓存
   *
   * @template T
   * @param {string} name 缓存名称
   * @param {() => T} defaultValue  (可选) 默认值
   * @param {number} expire  (可选) 有效期（默认会取相关 store 的配置，单位：秒， 0 为永不过期）
   * @param {{
   *       max: number;
   *       maxAge: number;
   *       dispose: any;
   *       length: number;
   *       stale: any;
   *     }} options  (可选) 配置（memory store 参考：cache-manager 的源码)
   * @returns {Promise<T>}
   * @memberof EggCache
   */
  get<T>(
    name: string,
    defaultValue?: () => T,
    expire?: number,
    options?: {
      max: number;
      maxAge: number;
      dispose: any;
      length: number;
      stale: any;
    }
  ): Promise<T>;

  /**
   * 设置缓存
   *
   * @template T
   * @param {string} name 缓存名称
   * @param {T} value 缓存值
   * @param {number} expire (可选) 有效期（默认会取相关 store 的配置，单位：秒， 0 为永不过期）
   * @param {{
   *       max: number;
   *       maxAge: number;
   *       dispose: any;
   *       length: number;
   *       stale: any;
   *     }} options  (可选) 配置（memory store 参考：cache-manager 的源码)
   * @memberof EggCache
   */
  set<T>(
    name: string,
    value: T,
    expire: number,
    options: {
      max: number;
      maxAge: number;
      dispose: any;
      length: number;
      stale: any;
    }
  ): void;

  /**
   * 缓存是否存在
   *
   * @param {string} name 缓存名称
   * @returns {boolean}
   * @memberof EggCache
   */
  has(name: string): boolean;

  /**
   * 删除缓存
   *
   * @param {string} name 缓存名称
   * @memberof EggCache
   */
  del(name: string): void;
  /**
   * 清空缓存
   *
   * @memberof EggCache
   */
  reset(): void;
}
