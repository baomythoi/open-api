import RabbitMQ from '@utils/rabbitmq';
import Pino from 'pino';
import NanoId from '@utils/nanoid';
import RedisService from '@core/base.redis';
import ConvertData from '@utils/convert-data';

export default class BaseCommon {
  static readonly nanoid = NanoId;
  static readonly rabbitmq = RabbitMQ;
  static readonly redis = RedisService;
  static readonly convertData = ConvertData;
  static readonly logger = Pino({
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  });

  static formatMoney(money: number) {
    return new Intl.NumberFormat().format(money);
  }

  static formatMoneyWithDot(money: number) {
    return new Intl.NumberFormat('vi-VN').format(money);
  }
}