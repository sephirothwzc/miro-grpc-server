/*
 * @Author: 吴占超
 * @Date: 2019-05-25 16:44:52
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-05-25 16:51:19
 */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType
} from 'sequelize-typescript';
import FlakeId = require('flake-idgen');
import intformat = require('biguint-format');
const { BIGINT } = DataType;
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });

@Table
export class BaseModel extends Model<BaseModel> {
  @Column({
    type: BIGINT,
    primaryKey: true,
    autoIncrement: false,
    defaultValue: () => intformat(flakeIdgen.next(), 'dec')
  })
  id: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;
}
