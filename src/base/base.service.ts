/*
 * @Author: 吴占超
 * @Date: 2019-05-27 09:40:49
 * @Last Modified by:   吴占超
 * @Last Modified time: 2019-05-27 09:40:49
 */
import { logger, provide, inject } from 'midway';
@provide()
export class BaseService {
  @logger()
  logger: any;

  @inject()
  cthrow: (status: number, message: string) => any;
}
