import BaseController from '@core/base.controller';
import { FastifyRequest, FastifyReply } from 'fastify';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// interface
import { FuncResponse } from '@interfaces/response';

export default class CriticalDisease extends BaseController {
  protected exchange = 'rpc.service.products.critical_disease.exchange';

  constructor() {
    super();
  }

  getPackages = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getpackagesResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.critical_disease.get_packages.routing',
      message: {
        params: req.query
      }
    })

    return getpackagesResult;
  }

  getFees = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getFeesResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.critical_disease.get_fees.routing',
      message: {
        params: req.body
      }
    })

    return getFeesResult;
  }

  createOrder = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const createOrderResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.critical_disease.create_order.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return createOrderResult;
  }

  getCommissionForView = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getCommissionResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.critical_disease.get_commission_for_view.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return getCommissionResult;
  }

  viewCertificate = async (req: FastifyRequest, reply: FastifyReply): Promise<FuncResponse<object>> => {
    const viewCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.critical_disease.view_certificate.routing',
      message: {
        params: req.params
      }
    })

    if (!viewCertResult.success) {
      const notfoundPath = resolve('src/modules/products/critical-disease/templates/notfound.html');
      const notfoundHtml = readFileSync(notfoundPath, 'utf-8');
      return reply.header('Content-Type', 'text/html').send(notfoundHtml);
    }

    const certificatePath = resolve('src/modules/products/critical-disease/templates/certificate.html');
    let certHtml = readFileSync(certificatePath, 'utf-8');

    certHtml = certHtml.replace('{{BUYER_NAME}}', viewCertResult.data.BUYER_NAME);
    certHtml = certHtml.replace('{{PACKAGE_NAME}}', viewCertResult.data.PACKAGE_NAME);
    certHtml = certHtml.replace('{{VALID_FROM}}', viewCertResult.data.VALID_FROM);
    certHtml = certHtml.replace('{{VALID_UNTIL}}', viewCertResult.data.VALID_UNTIL);

    const certificates = viewCertResult.data.CERTIFICATES.map((item: any) => {
      let CERT_URL = 'N/A';
      if (item.CERT_URL)
        CERT_URL = `
        <b>
          <i style="color: #0068FF;">
            <a href="${item.CERT_URL}" target="_blank" style="text-decoration: none;">
            <img style="width: 15px; margin-right: 5px;"
            src="https://cdn.globalcare.vn/private/images/pvi/logo/download.svg">
            Link tải file
            </a>
          </i>
        </b>`;

      return `<div class="box" style="line-height: 1.4; margin-top: 15px;">
        <ul>
          <li>
            <p style="font-size: 18px;">
              <span>Số giấy chứng nhận: </span> <b>${item.CERT_NUM}</b>
            </p>
          </li>
        </ul>
        <ul style="list-style-type: none; line-height: 30px; margin-top: -10px">
          <li style="text-decoration: none;">
            <div class="container" style="display: flex; justify-content: space-between; width: 390px;">
              <span class="box"><i>Ngày cấp:</i> <b><i style="color: #009A27;">${item.VALID_FROM}</i></b></span>
              <span class="box"><i>Ngày hết hạn:</i> <b><i style="color: #FF0000;">${item.VALID_UTIL}</i></b></span>
            </div>
          </li>
          <li style="text-decoration: none;">
            <span style="font-size: 16px;">
              <i>Đường dẫn:</i>
              ${CERT_URL}
            </span>
          </li>
        </ul>
      </div>
    `}).join('\n')

    certHtml = certHtml.replace('{{CERTIFICATES}}', certificates);

    return reply.header('Content-Type', 'text/html').send(certHtml);
  }

  verifyReward = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.critical_disease.reward_verify.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return getCertResult;
  }

  verifyEffectiveDate = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getCertResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.critical_disease.verify_effective_date.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return getCertResult;
  }
}
