/*
 * @Author: 吴占超
 * @Date: 2019-08-09 11:02:00
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-09 16:07:03
 */
import { provide, plugin, config } from 'midway';
import { BaseService } from '../../base/base.service';
import { ILoginIn, ILoginOut, IAuth } from '../interfaces/auth';
// import { EggCache } from 'egg-cache';
// import { CACHAE } from '../consts/cache';

export interface IAuthService extends AuthService {}

@provide()
export class AuthService extends BaseService {
  @plugin()
  private jwt: any;

  @config('jwt')
  private jwtconfig: any;

  async login(param: ILoginIn): Promise<ILoginOut> {
    // #region 登录
    // #endregion

    const authde: IAuth = {
      id: '1',
      userName: param.username,
      provider: 'sys',
      onTime: new Date()
    };
    const token = this.jwt.sign(authde, this.jwtconfig.secret, {
      expiresIn: this.jwtconfig.expiresIn
    });
    return {
      username: param.username,
      role: [],
      path: [],
      token
    };
  }
}
