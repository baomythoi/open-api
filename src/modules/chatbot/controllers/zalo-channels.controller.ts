import BaseController from '@core/base.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class ZaloChannels extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getZaloConnectUrl = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.get_zalo_connect_url.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  zaloCallback = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    if (process.env.NODE_ENV !== 'production')
      reply.code(200).type('text/html').send('OK');

    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.zalo_callback.routing',
      message: {
        params: req.query,
      }
    });

    const locale = result?.data?.locale || 'vi';

    const redirectUrl =
      locale === 'vi'
        ? `https://${process.env.PLATFORM_REDIRECT_URL}/vi/dashboard/channels`
        : `https://${process.env.PLATFORM_REDIRECT_URL}/en/dashboard/channels`;

    reply
      .code(302)
      .header('Location', redirectUrl)
      .type('text/html')
      .send();
  }

  verifyZaloWebhook = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    reply.code(200).type('text/html').send('OK');
    return;
  };

  zaloWebhook = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { headers, params, body } = req;

    const messagePayload = {
      headers,
      params,
      body
    };

    this.pushToWorker({
      exchange: 'worker.chatbot.messages.exchange',
      routing: 'worker.chatbot.messages.zalo.receive.routing',
      message: {
        params: { data: messagePayload }
      }
    });

    reply.code(200).type('text/html').send('EVENT_RECEIVED');
  };

  replyFromN8nToZalo = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: 'worker.chatbot.messages.exchange',
      routing: 'worker.chatbot.messages.zalo.reply.routing',
      message: {
        params: req.body
      }
    });

    return { statusCode: 200, success: true };
  };

  setZaloOAActiveStatus = async (req: FastifyRequest<{
    Params: {
      oaUid: string
    },
    Body: {
      status: boolean
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.set_zalo_oa_active_status.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.body
        }
      }
    });

    return result;
  }
}