/*
 * @Author: 吴占超
 * @Date: 2019-06-04 18:26:42
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-07-02 16:29:48
 * 使用方法：
 *    @inject('encryption')
 *    private encryptionCMQ;
 *    private encryption: IEncryption;
 *
 *    @init()
 *    async init() {
 *      this.encryption = await this.encryptionCMQ('cmq',ETypeCrypt.xxx);
 *    }
 *
 */
import { ScopeEnum, providerWrapper, IApplicationContext } from 'midway';
import * as fs from 'fs';
import * as _ from 'lodash';
import JSEncrypt = require('node-jsencrypt');
import crypto = require('crypto');

export interface IEncryption extends Encryption {}

export enum ETypeCrypt {
  All,
  /**
   * 加密 public 公钥
   */
  Encrypt,
  /**
   * 解密 private 私钥
   */
  Decrypt
}
/**
 * 修改为动态加解密文件类型
 */
export class Encryption {
  private prikey2: string;
  private pubkey2: string;
  encrypt: JSEncrypt = new JSEncrypt();
  decrypt: JSEncrypt = new JSEncrypt();

  // @init()
  async init(prefix: string, type: ETypeCrypt) {
    if (type === ETypeCrypt.Decrypt || type === ETypeCrypt.All) {
      this.prikey2 = fs
        .readFileSync(`src/config/keys/${prefix}_1024_priv.pem`, 'utf8')
        .toString();
      this.decrypt.setPrivateKey(this.prikey2);
    } // 私有key给客户端【需要 pem 编码的key】server.pem
    if (type === ETypeCrypt.Encrypt || type === ETypeCrypt.All) {
      this.pubkey2 = fs
        .readFileSync(`src/config/keys/${prefix}_1024_pub.pem`, 'utf8')
        .toString();
      this.encrypt.setPublicKey(this.pubkey2);
    } // 公有key服务器存储【需要 pem 编码的key】cert.pem
  }

  /**
   * md5 加密
   * @param data
   */
  md5encryption(data: string): string {
    const md5 = crypto.createHash('md5');
    return md5.update(data).digest('hex');
  }
  /**
   * 加密 公鑰
   * @param data
   */
  encryption(data: string): string {
    return this.encrypt.encrypt(data);
  }
  /**
   * 解密 私鑰
   * @param encrypted
   */
  decryptJse(encrypted: string): string {
    return this.decrypt.decrypt(encrypted);
  }
  /**
   * 签名
   * @param data
   */
  signRSA(data: string): string {
    const sign = crypto.createSign('RSA-SHA1'); // 创建签名算法
    sign.update(Buffer.from(data, 'utf-8'));
    return sign.sign(this.prikey2, 'base64'); // 得到签名
  }

  /**
   * 验签
   *
   * @param {string} data 数据
   * @param {string} sign 签名
   * @returns
   * @memberof Encryption
   */
  verifyRSA(data: string, sign: string) {
    const verify = crypto.createVerify('RSA-SHA1');
    verify.update(Buffer.from(data, 'utf-8'));
    return verify.verify(this.pubkey2, sign, 'base64');
  }
}

export function encryptionFactory(context: IApplicationContext) {
  return async (prefix: string, type: ETypeCrypt) => {
    const prefixItem = new Encryption();
    prefixItem.init(prefix, type);
    return prefixItem;
  };
}

providerWrapper([
  {
    id: 'encryption',
    provider: encryptionFactory,
    scope: ScopeEnum.Singleton
  }
]);
