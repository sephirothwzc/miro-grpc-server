/*
 * @Author: 吴占超
 * @Date: 2019-08-09 11:01:37
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-09 15:49:49
 */
import { provide, Context, inject } from 'midway';
import { IAuthService } from '../../lib/services/auth';
import { BaseController } from '../../base/base.controller';
import {
  SwaggerJoiController as sjc,
  SwaggerJoiPost
} from 'midway-joi-swagger2';
import { SLoginIn, SLoginOut } from '../../lib/schemas/auth';

@provide()
@sjc({ path: '/api/auth', api: 'auth' })
export class AuthController extends BaseController {
  @inject()
  private authService: IAuthService;

  @SwaggerJoiPost({
    path: '/login',
    api: 'auth',
    summary: 'login',
    description: '登录',
    body: SLoginIn,
    responses: SLoginOut
  })
  async login(ctx: Context) {
    const { username, role, path, token } = await this.authService.login(
      ctx.request.body
    );
    ctx.header.token = token;
    ctx.body = { username, role, path };
  }
}
