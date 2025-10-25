import BaseController from '@core/base.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

// interface
import { FuncResponse } from '@interfaces/response';

export default class Channels extends BaseController {
  protected exchange = 'rpc.service.chatbot.exchange';

  constructor() {
    super();
  }

  getPages = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.get_pages.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  deletePage = async (req: FastifyRequest<{
    Params: { pageUid: string }, 
    Querystring: { platform: string },
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.delete_page.routing',
      message: {
        authentication: req.authentication,
        params: {
          ...req.params,
          ...req.query
        },
      }
    });

    return result;
  }

  getFacebookOAuthUrl = async (): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.get_facebook_login_url.routing',
      message: {}
    });

    return result;
  }

  getFacebookConnectUrl = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.get_facebook_connect_url.routing',
      message: {
        authentication: req.authentication,
        params: req.query,
      }
    });

    return result;
  }

  facebookCallback = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.facebook_callback.routing',
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

  registerWebhookForApp = async (): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.facebook_register_webhook.routing',
      message: {}
    });

    return result;
  }

  facebookWebhook = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { headers, params, body } = req;

    const messagePayload = {
      headers,
      params,
      body
    };

    this.pushToWorker({
      exchange: 'worker.service.chatbot.exchange',
      routing: 'worker.chatbot.facebook.forward_message_to_n8n.routing',
      message: {
        params: { data: messagePayload }
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

  setFacebookPageActiveStatus = async (req: FastifyRequest<{
    Params: {
      pageUid: string
    },
    Body: {
      status: boolean
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.set_facebook_page_active_status.routing',
      message: {
        params: {
          ...req.params,
          ...req.body
        }
      }
    });

    return result;
  }

  updateFacebookPagePrompt = async (req: FastifyRequest<{
    Params: {
      pageUid: string
    },
    Body: {
      promptType: 'system_prompt' | 'classify_prompt';
      promptUid?: string;
      customContent?: string;
    }
  }>): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.update_facebook_page_prompt.routing',
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

  replyFromN8n = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    this.pushToWorker({
      exchange: 'worker.service.chatbot.exchange',
      routing: 'worker.chatbot.facebook.send_reply_to_user.routing',
      message: {
        params: req.body
      }
    });

    return { statusCode: 200, success: true };
  }

  getZaloConnectUrl = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.get_zalo_connect_url.routing',
      message: {
        authentication: req.authentication
      }
    });

    return result;
  }

  zaloCallback = async (req: FastifyRequest): Promise<FuncResponse<object>> => {
    const result = await this.postMessages({
      exchange: this.exchange,
      routing: 'rpc.chatbot.channels.zalo_callback.routing',
      message: {
        params: req.query,
      }
    });

    return result;
  }
}