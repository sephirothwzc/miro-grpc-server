import { Context } from 'midway';

export const development = {
  watchDirs: [
    'app',
    'lib',
    'service',
    'config',
    'app.ts',
    'agent.ts',
    'interface.ts'
  ],
  overrideDefault: true
};

export const sequelize = {
  dialect: 'mysql',
  host: '152.136.213.120',
  port: '6606',
  database: 'advokate_earn_dev',
  username: 'root',
  password: 'Admin@123',
  timezone: '+08:00',
  modelFile: 'ts',
  dialectOptions: {
    // useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: (field: any, next: () => void) => {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    }
  }
};

// cluster
export const cluster = {
  listen: {
    path: '',
    port: 8079,
    hostname: 'localhost'
    // hostname: '192.168.0.103',
  }
};

/**
 * 微信api
 */
export const wxapi = {
  path: 'http://localhost:8090',
  token: 'ujmik,123'
};

export const onerror = {
  // all(err, ctx) {
  //   // 在此处定义针对所有响应类型的错误处理方法
  //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //   ctx.body = 'error';
  //   ctx.status = 500;
  // },
  html(err: any, ctx: Context) {
    // html hander
    ctx.body = `<h3>${JSON.stringify(err)}</h3>`;
    ctx.status = 500;
  },
  json(err: any, ctx: Context) {
    // json hander
    [422, 511, 512].includes(ctx.status) && (ctx.body = err);
    // ctx.status = 511;
  },
  jsonp(err: any, ctx: Context) {
    // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
  }
};

/**
 * jwt
 */
export const jwt = {
  secret: 'gh_316a17f857f1',
  expiresIn: '1 days'
};

export const cache = {
  default: 'memory',
  stores: {
    memory: {
      driver: 'memory',
      max: 100,
      ttl: 0
    }
  }
};

export const joiSwagger = {
  title: 'Api平台',
  version: 'v1.0.0',
  description: '开发环境文档',
  test: true,
  swaggerOptions: {
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'auth',
        in: 'header'
      }
    }
  }
};

export const consul = {
  server: {
    host: '127.0.0.1', // 注册中心ip地址
    port: 8500 // 注册中心端口号
  },
  services: [
    // 服务发现列表
    // {
    //   referName: 'consulPlusTest', // 引用名，后续可用 app.services.referName 访问服务
    //   comment: 'consulPlusTest', // 备注
    //   serviceId: 'consul-plus-test' // 服务id
    // }
  ],
  register: true, // 是否注册当前模块，默认为false
  multiInstance: false, // 多实例模式开关，默认为false，注意当开启多实例，务必保证集群中的每个项目的keys不同，或者会导致先启动的项目被隔离(被覆盖)
  name: 'consul-plus-test', // 注册id keys
  tags: ['consul-plus-test'], // 标签信息
  check: {
    http: 'http://127.0.0.1:8079', // 健康检测地址
    interval: '5s', // 健康检测间隔
    notes: 'http service check',
    status: 'critical'
  },
  address: '10.144.108.63', // 当前模块的注册地址 不能用本地
  port: 50051 // 当前模块的注册端口号
};
