import BaseController from '@core/base.controller';

export default class TrackingUserReward extends BaseController {
  protected exchange = 'worker.service.ewallet.exchange';

  constructor() {
    super();
  }

  refundPending = async (): Promise<Promise<object>> => {
    this.pushToWorker({
      exchange: this.exchange,
      routing: 'worker.ewallet.reward.refund_pending.routing',
      message: {
        params: {}
      }
    })

    return this.responseSuccess();
  }
}