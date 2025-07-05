import BaseService from "@core/base.service";

// interface
import { FuncResponse } from '@interfaces/response';
import { Authentication } from '@interfaces/authentication/user';
import { HeaderKey } from '@interfaces/authentication/rsa';

export default new class RSAService extends BaseService {
  protected defaultExchange = 'rpc.service.authentication.exchange';

  constructor() {
    super()
  }

  register = async (params: any, authentication: Authentication): Promise<FuncResponse<any>> => {
    const message = {
      params,
      authentication
    }

    const registerResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.security.rsa_register_key.routing',
      message
    });

    return registerResult;
  }

  encrypt = async (params: any): Promise<FuncResponse<any>> => {
    const message = {
      params,
    }

    const encryptResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.security.encrypt.routing',
      message,
    });

    return encryptResult;
  }

  async decryptData(headerKey: HeaderKey, params: any): Promise<FuncResponse<any>> {
    const message = {
      params: {
        clientCode: headerKey.xApiClient,
        vectorKey: headerKey.xApiSecret,
        encryptKey: headerKey.xApiKey,
        example: headerKey.example,
        data: params.xdata
      }
    }

    const decryptResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.security.decrypt.routing',
      message
    });

    return decryptResult;
  }

  createMD5 = async (params: any): Promise<FuncResponse<any>> => {
    const message = {
      params
    }

    const generateMD5Result = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.security.create_md5.routing',
      message
    });

    return generateMD5Result;
  }

  signing = async (params: any): Promise<FuncResponse<any>> => {
    const message = {
      params
    }

    const signingResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.security.signing.routing',
      message
    });

    return signingResult;
  }

  verifycation = async (clientCode: string | string[], params: any) => {
    const message = {
      params: {
        clientCode,
        data: params.xdata,
        signature: params.signature
      }
    }

    const verificationResult = await this.postMessages({
      exchange: this.defaultExchange,
      routing: 'rpc.authentication.security.verification.routing',
      message
    });

    return verificationResult;
  }
}