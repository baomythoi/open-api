import BaseController from '@core/base.controller';
import { FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'crypto';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Channels extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getFacebookConnectUrl = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.get_facebook_connect_url.routing',
      message: {
        authentication: req.authentication
      }
    });

    return result;
  }

  facebookCallback = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.facebook_callback.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }

  registerWebhookForApp = async (): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.facebook_register_webhook.routing',
      message: {}
    });

    return result;
  }

  facebookWebhook = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const body = req.body as any;
    const headers = req.headers as any;
    const params = req.params as any;

    const data = {
      headers,
      params,
      body
    };

    await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.facebook_post_message_to_n8n.routing',
      message: {
        params: { data }
      }
    });

    reply.code(200).type('text/html').send('EVENT_RECEIVED');
  };

  verifyFacebookWebhook = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const query = req.query as Record<string, string>;
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    const verifyToken = process.env.FB_VERIFY_TOKEN as string;

    if (mode === 'subscribe' && token === verifyToken) {
      reply.code(200).type('text/html').send(challenge);
      return;
    }

    reply.code(403).type('text/html').send('Forbidden');
  };
}