import _ from 'lodash';
import { MidwayMockApplication } from 'midway-mock/src';

/*
 * @Author: 吴占超
 * @Date: 2019-07-23 17:57:17
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-09 10:21:49
 */
export const findToken = async (
  app: MidwayMockApplication
): Promise<string> => {
  const token = app.getConfig('token');
  return app['cache'].get(
    'token',
    async () => {
      return token;
      // const result = await app
      //   .httpRequest()
      //   .post('/')
      //   .send({
      //     token
      //   });
      // return result.body.serverToken;
    },
    7100
  );
};
