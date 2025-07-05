import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertBooks extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  configCreate = async (): Promise<FuncResponse<object>> => {
    const configCreateResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.config_create.routing',
      message: {
        params: {}
      }
    })

    return configCreateResult;
  }

  verifyDataBeforeCreate = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const verifyDataResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.verify_data_before_create.routing',
      message: {
        params: req.body
      }
    })

    return verifyDataResult;
  }

  create = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const createBookResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.create.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return createBookResult;
  }

  createBookType = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const createBookTypeResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.create_type.routing',
      message: {
        params: req.body
      }
    })

    return createBookTypeResult;
  }

  getBooks = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getBooksResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.get_list.routing',
      message: {
        params: req.query
      }
    })

    return getBooksResult;
  }

  getBook = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getBookResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.get.routing',
      message: {
        params: req.params
      }
    })

    return getBookResult;
  }

  cancel = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const createBookResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.cancel.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params as Record<string, any>,
          ...req.body as Record<string, any>
        }
      }
    })

    return createBookResult;
  }

  getBooksRegistered = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getBooksRegisteredResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.get_list_registered.routing',
      message: {
        params: req.query
      }
    })

    return getBooksRegisteredResult;
  }

  getProviders = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getProvidersResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.book.get_providers.routing',
      message: {
        params: {}
      }
    })

    return getProvidersResult;
  }

  exportBooks = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const exportBookResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.export.routing',
      message: {
        params: req.query
      }
    })

    return exportBookResult;
  }

  exportBooksRegistered = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const exportBooksRegisteredResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.export_registered.routing',
      message: {
        params: req.query
      }
    })

    return exportBooksRegisteredResult;
  }

  returnProvider = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const returnProviderBookResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.book.return_provider.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params as Record<string, any>,
          ...req.body as Record<string, any>
        }
      }
    })

    return returnProviderBookResult;
  }

  expired = async (): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: 'worker.service.products.vehicle_cert.exchange',
      routing: 'worker.products.vehicle_cert.change_status_books_expired.routing',
      message: {
        params: {}
      }
    })

    return this.responseSuccess();
  }
}