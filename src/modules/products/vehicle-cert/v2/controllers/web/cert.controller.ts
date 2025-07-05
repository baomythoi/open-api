import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class WebCerts extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getCertStats = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const certStatsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert_stats.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return certStatsResult;
  }
 
  getListCerts = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const listCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return listCertResult;
  }
  
  getDetailCerts = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const certDetailResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert_detail.routing',
      message: {
        authentication: req.authentication,
        params: req.params
      }
    })

    return certDetailResult;
  }

  getCertCode = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getCertCodeResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert_code.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getCertCodeResult;
  }
  
  activateCert = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const activateCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_activate_cert.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return activateCertResult;
  }
  
  activateCertLated = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const activateCertLatedResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_activate_lated_cert.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return activateCertLatedResult;
  }
  
   certCheckSeri = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const seriResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert_check_seri.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return seriResult;
  }

  certRequestEdit = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const certRequestEditlResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert_request_edit.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })
    
    return certRequestEditlResult;
  }
  
  certOldSeri = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const certOldSeriResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert_old_list_seri.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return certOldSeriResult;
  }

  checkCertNotUse = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const certOldSeriResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.vehicle_cert_not_use.routing',
      message: {
        params: req.query
      }
    })

    return certOldSeriResult;
  }
}