/*
 * @Author: 吴占超
 * @Date: 2019-07-16 16:27:55
 * @Last Modified by:   吴占超
 * @Last Modified time: 2019-07-16 16:27:55
 */
export interface IAuth {
  /**
   * user id
   */
  id: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * app setting
   */
  provider: string;
  /**
   * user code
   */
  code: string;
  /**
   * login time
   */
  onTime: Date;
}
