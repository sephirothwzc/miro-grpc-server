/*
 * @Author: 吴占超
 * @Date: 2019-08-09 11:05:25
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-09 14:51:45
 */
export interface ILoginIn {
  username: string;
  password: string;
}

export interface ILoginOut {
  username: string;
  role: string[];
  path: any[];
  token: string;
}

export interface IAuth {
  /**
   * user id
   */
  id: string;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * app setting
   */
  provider?: string;
  /**
   * user code
   */
  code?: string;
  /**
   * login time
   */
  onTime: Date;
}
