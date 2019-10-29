/*
 * @Author: 吴占超
 * @Date: 2019-10-29 11:06:20
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-10-29 15:21:30
 */
import { provide } from 'midway';

@provide('Hello')
export class Hello {
  async SayHello(call: any, callback: any) {
    console.log(call);
    await callback(null, call.request);
  }
}
