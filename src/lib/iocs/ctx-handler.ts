/*
 * @Author: 吴占超
 * @Date: 2019-06-04 16:31:53
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-06-13 10:32:44
 */
import { providerWrapper } from 'midway';
import FlakeId = require('flake-idgen');
import intformat = require('biguint-format');
import * as _ from 'lodash';
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });

export const factoryThrow = (context: any) => {
  return context.ctx.throw;
};

export interface ISnowflakeId {
  create: () => string;
}

export const snowflakeId = (context: any) =>
  ({
    create() {
      return _.toString(intformat(flakeIdgen.next(), 'dec'));
    }
  } as ISnowflakeId);

providerWrapper([
  // {
  //   id: 'i18n',
  //   provider: factoryI18n
  // },
  {
    id: 'cthrow',
    provider: factoryThrow
  },
  {
    id: 'snowflakeId',
    provider: snowflakeId
  }
]);
