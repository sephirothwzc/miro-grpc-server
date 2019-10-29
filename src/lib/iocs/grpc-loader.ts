/*
 * @Author: 吴占超
 * @Date: 2019-10-29 14:02:54
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-10-29 15:29:22
 */
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { Application } from 'midway';
import * as path from 'path';
import * as fs from 'fs';

export const grpcLoader = async (app: Application) => {
  const config = app.getConfig('midwayGrpcServer');
  const protoPath = config.protoPath;
  // 创建server
  app.midwayGrpcServer = new grpc.Server();
  await getAllServices(path.join(app.baseDir, protoPath), app, config);
  app.midwayGrpcServer.bind(
    `${config.host}:${config.port}`,
    grpc.ServerCredentials.createInsecure()
  );
  app.ready(() => {
    app.midwayGrpcServer.start();
    app.logger.info('[egg-grpc-server] grpc start on port:' + config.port);
  });
};

async function getAllServices(
  protoPath: string,
  app: Application,
  config: any
) {
  if (!fs.existsSync(protoPath)) {
    throw new Error('没有配置proto路径');
  }
  const protoFileList = fs.readdirSync(protoPath);
  const protoObjList = protoFileList
    .filter(
      p =>
        path.extname(p) === '.proto' &&
        fs.statSync(path.join(protoPath, p)).isFile()
    )
    .map(p =>
      protoLoader.load(path.join(protoPath, p), config.loaderOption || {})
    );
  const result = await Promise.all(protoObjList);
  result.forEach(async protoObj => {
    for (const rpcpackage in protoObj) {
      const ps = rpcpackage.split('.');
      if (!ps || ps.length === 0) {
        continue;
      }
      const protoServer = protoObj[rpcpackage];
      if (!protoServer || protoServer['format']) {
        continue;
      }
      app.coreLogger.debug(`[midway-grpc-server] ${rpcpackage} init`);
      const classServices = await app.applicationContext.getAsync(ps[1]);
      classServices &&
        app.midwayGrpcServer.addService(protoServer, classServices);
    }
  });
}
