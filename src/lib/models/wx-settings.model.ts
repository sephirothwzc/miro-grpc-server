/*
 * @Author: 吴占超
 * @Date: 2019-05-24 14:57:02
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-05-26 10:25:18
 */
import { providerWrapper } from 'midway';
import { Table, Column } from 'sequelize-typescript';
import { BaseModel } from '../../base/base.model';

// @provide 用 工厂模式static model
export const factory = () => WxSettingsModel;
providerWrapper([
  {
    id: 'WxSettingsModel',
    provider: factory
  }
]);
// 依赖注入用导出类型
export type IWxSettingsModel = typeof WxSettingsModel;

@Table({
  tableName: 'wx_settings'
})
export class WxSettingsModel extends BaseModel {
  @Column({
    comment: '编码'
  })
  code: string;

  @Column({ comment: '标识' })
  key: string;

  @Column({ comment: '设置值' })
  ofvalue: string;

  @Column({ comment: '上级关联' })
  parentId: string;

  /**
   * 自定义
   */
  @Column({ comment: '自定义' })
  remark: string;
}
