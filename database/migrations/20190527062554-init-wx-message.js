'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { DATE, STRING } = Sequelize;
    await queryInterface.createTable(
      'wx_message',
      {
        id: { type: STRING(20), primaryKey: true, comment: 'key' },
        created_at: DATE,
        updated_at: DATE,
        deleted_at: DATE,
        type: { type: STRING(10), comment: '[send,receive]' },
        host: { type: STRING(500), comment: 'host' },
        send_url: { type: STRING(2000), comment: 'send url' },
        // 参数数据
        param_data: { type: Sequelize.JSON, comment: '参数数据' },
        // 响应时间
        start_time: { type: STRING(50), comment: '响应时间' },
        // 结束时间
        end_time: { type: STRING(50), comment: '结束时间' },
        mq_id: { type: DATE, comment: '消息队列id' },
        // 自定义备注
        remark: STRING(5000),
      },
      {
        comment: '微信消息',
      }
    );
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('wx_message');
  }
};
