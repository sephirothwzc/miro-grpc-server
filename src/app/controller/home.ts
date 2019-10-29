/*
 * @Author: 吴占超
 * @Date: 2019-08-09 10:24:11
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-09 15:31:17
 */
import { provide, Context, get, controller } from 'midway';
import { BaseController } from '../../base/base.controller';

@provide()
@controller('/')
export class HomeController extends BaseController {
  @get('/web/*')
  async view(ctx: Context) {
    await ctx.render('index');
  }
}
