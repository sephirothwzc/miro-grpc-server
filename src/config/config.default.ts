import * as path from 'path';

export = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558664005392_5443';

  // add your config here
  config.middleware = [];

  // cluster
  // config.cluster = {
  //   listen: {
  //     port: 8079,
  //     hostname: '0.0.0.0'
  //   }
  // };

  config.midwayGrpcServer = {
    protoPath: 'lib/proto', // *.proto path
    extendPath: 'app/grpc', // service path
    host: '0.0.0.0',
    port: '50051',
    loaderOption: {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  config.view = {
    root: [path.join(appInfo.baseDir, 'app/public')].join(','),
    baseDir: 'app/public',
    defaultExtension: '.nj',
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks'
    }
  };

  // static
  config.static = {
    prefix: '/web/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    gzip: true
  };

  config.bodyParser = {
    jsonLimit: '20mb',
    formLimit: '20mb'
  };
  return config;
};
