/*
 * @Author: 吴占超
 * @Date: 2019-08-09 13:59:27
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-09 14:12:23
 */
import * as joi from 'joi';
export const SLoginIn = joi.object({
  username: joi
    .string()
    .required()
    .max(10)
    .description('用户名'),
  password: joi
    .string()
    .required()
    .max(20)
    .description('密码')
});

export const SLoginOut = joi.object({
  username: joi
    .string()
    .required()
    .max(10)
    .description('用户名'),
  role: joi.array().items(joi.string()),
  path: joi.array().items(joi.string())
});
