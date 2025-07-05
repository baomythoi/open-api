import BaseController from '@core/base.controller';
import { FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class VehicleCertAppBooks extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  getStatistics = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getStatisticsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.get_statistics.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getStatisticsResult;
  }

  getAgents = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getDirectCollaboratorsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.get_agents.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getDirectCollaboratorsResult;
  }

  getUnderCollaborators = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getDirectCollaboratorsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.get_under_collaborators.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getDirectCollaboratorsResult;
  }

  getCollaboratorCerts = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getDirectCollaboratorsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.get_collaborator.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getDirectCollaboratorsResult;
  }

  getChart = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const getDirectCollaboratorsResult = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.gsale.cert.get_chart.routing',
      message: {
        authentication: req.authentication,
        params: req.query
      }
    })

    return getDirectCollaboratorsResult;
  }
}