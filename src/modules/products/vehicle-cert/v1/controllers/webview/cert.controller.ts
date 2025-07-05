import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertWebCerts extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getVehicleType = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const registerResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.get_vehicle_type.routing',
      message: {
        params: {}
      }
    })

    return registerResult;
  }

  getSeries = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const registerResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.get_series.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return registerResult;
  }

  useDebt = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const useResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.use_debt.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return useResult;
  }

  depositMotorbikeFees = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const feesResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.deposit_motorbike_fees.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return feesResult;
  }

  depositCarFees = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const feesResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.deposit_car_fees.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return feesResult;
  }

  motorUseDeposit = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const useResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.motorbike_use_deposit.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return useResult;
  }

  carUseDeposit = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const useResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.web.cert.car_use_deposit.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return useResult;
  }

  motorbikeCommission = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const commissionResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.commission.motor_get_for_view.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return commissionResult;
  }

  carCommission = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const commissionResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.commission.car_get_for_view.routing',
      message: {
        authentication: req.authentication,
        params: req.body
      }
    })

    return commissionResult;
  }
}