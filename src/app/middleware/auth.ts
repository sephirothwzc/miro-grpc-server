import { IAuth } from '../../lib/interfaces/sys-user';
import { promisify } from 'util';
/*
 * @Author: 吴占超
 * @Date: 2019-06-07 16:01:26
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-07-16 16:28:14
 * auth 创建
 */

module.exports = () => {
  return async function auth(ctx: any, next: () => void) {
    const { token } = ctx.request.header;
    if (token) {
      // const decoded = await checkVerify(ctx, token);
      const promiseVerify = promisify(ctx.app.jwt.verify);
      promiseVerify(token, ctx.app.config.jwt.secret)
        .then(async (decoded: IAuth) => {
          const auth: IAuth = await ctx.requestContext.getAsync('Auth');
          auth.id = decoded.id;
          auth.code = decoded.code;
          auth.onTime = decoded.onTime;
          auth.userName = decoded.userName;
          auth.provider = decoded.provider;
          next();
        })
        .catch((err: Error) => {
          ctx.throw(401, err.message);
        });
    } else {
      ctx.throw(401, '401.2');
    }
  };
};
