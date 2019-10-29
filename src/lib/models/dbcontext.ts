import { provide, scope, ScopeEnum, config } from 'midway';
import { Sequelize } from 'sequelize-typescript';
import * as _ from 'lodash';

interface ISequelizeConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: string;
  timezone: '+08:00';
  /**
   * 存储目录，项目目录后缀目录 ts\js
   */
  modelFile: string;
  dialectOptions?: {
    useUTC: false;
    dateStrings: true;
    typeCast: (field: any, next: () => void) => any;
  };
}

export interface IDBContext extends DBContext {}

@scope(ScopeEnum.Singleton)
@provide('DBContext')
export class DBContext {
  sequelize: Sequelize;

  @config('sequelize')
  config: ISequelizeConfig;

  @config('env')
  env: string;

  async init() {
    await new Promise(resolve => {
      this.sequelize = new Sequelize({
        dialect: 'mysql',
        host: this.config.host,
        timezone: this.config.timezone,
        port: this.config.port,
        database: this.config.database,
        username: this.config.username,
        password: this.config.password,
        storage: ':memory:',
        modelPaths: [__dirname + `/*.model.${this.config.modelFile}`],
        modelMatch: (filename, member) => {
          return _.endsWith(member, 'Model');
        },
        define: {
          timestamps: true,
          paranoid: true,
          charset: 'utf8',
          underscored: true
        },
        dialectOptions: this.config.dialectOptions
      });
      return this.sequelize
        .authenticate()
        .then(result => {
          console.log('DataBase Connection successfully!');
        })
        .catch(err => {
          throw new Error(`Unable to connect to the database:${err}`);
        });
    });
  }
}
