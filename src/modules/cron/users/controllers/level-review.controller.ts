import BaseController from '@core/base.controller';
import { FastifyRequest, FastifyReply } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class LevelReview extends BaseController {
  protected exchange = 'worker.service.users.exchange';

  constructor() {
    super();
  }

  review = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: this.exchange,
      routing: 'worker.users.level_upgrade_review.routing',
      message: {}
    })

    return this.responseSuccess();
  }

  changeParetnt = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: this.exchange,
      routing: 'worker.users.change_parent_after_review.routing',
      message: {}
    })

    return this.responseSuccess();
  }

  reviewDowngrade = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: this.exchange,
      routing: 'worker.users.level_downgrade_review.routing',
      message: {}
    })

    return this.responseSuccess();
  }

  levelReviewNotify = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: this.exchange,
      routing: 'worker.users.level_review_notify.routing',
      message: {}
    })

    return this.responseSuccess();
  }
}