import BaseController from '@core/base.controller';

export default class TrackingUserReward extends BaseController {
  protected exchange = 'rpc.service.products.vehicle_cert.exchange';

  constructor() {
    super();
  }

  SendNotUse48h = async (): Promise<Promise<object>> => {
    return await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.products.vehicle_cert.crm.send_email_48h.routing',
      message: {
        params: {}
      }
    });
  }
}
