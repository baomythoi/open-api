import BaseController from '@core/base.controller';

import { FastifyRequest } from 'fastify';

// service
import MotorcycleService from '@products/master-rider/services/motorcycle.service';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Motorcycles extends BaseController {
  constructor() {
    super();
  }

  getVehicleTypes = async (): Promise<FuncResponse<object>> => {
    const vehicleTypesResult = await MotorcycleService.getVehicleTypes();

    return vehicleTypesResult;
  }

  getManufactures = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const manufacturesResult = await MotorcycleService.getManufactures(req.query);

    return manufacturesResult;
  }

  getMotorcycles = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const manufacturesResult = await MotorcycleService.getMotorcycles(req.query);

    return manufacturesResult;
  }

  getPackages = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const packagesResult = await MotorcycleService.getPackages(req.query, req.authentication);

    return packagesResult;
  }

  verifyRedeemCode = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const packagesResult = await MotorcycleService.verifyRedeemCode(req.body, req.authentication);

    return packagesResult;
  }

  createOrder = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const createResult = await MotorcycleService.createOrder(req.body, req.authentication);

    return createResult;
  }

  getCertificate = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getCertResult = await MotorcycleService.getCertificate(req.params);

    return getCertResult;
  }

  manualCommissionPayout = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const payoutResult = await MotorcycleService.manualCommissionPayout(req.params);

    return payoutResult;
  }

  getCommissionForView = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const payoutResult = await MotorcycleService.getCommissionForView(req.body, req.authentication);

    return payoutResult;
  }

  manualNotificationsSend = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const notificationsSendResult = await MotorcycleService.manualNotificationsSend(req.params);

    return notificationsSendResult;
  }
}