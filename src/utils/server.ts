import 'dotenv/config';
import {
  FastifyRequest,
  FastifyReply,
  fastify
} from 'fastify';
import AutoLoad from '@fastify/autoload';
import rateLimit from '@fastify/rate-limit';
import FormBody from '@fastify/formbody';
import QS from 'qs';
import Pino from 'pino';
import Cors from '@fastify/cors';
import Compress from '@fastify/compress';
import path from 'path';
import Helmet from '@fastify/helmet';
import responseHandler from '@utils/response-handler';
import Redis from '@core/base.redis';
import RabbitMQ from '@utils/rabbitmq';
import fastifyMultipart from 'fastify-multipart';

/** optional key */
declare module 'fastify' {
  interface FastifyRequest {
    authentication: {
      username: string;
      clientType: 'app' | 'portal'
    };
  }

  interface FastifyContextConfig {
    rateLimit?: {
      max: number;
      timeWindow: string;
    };
  }
}

export async function buildServer() {
  const fastifyInstance = fastify({
    logger: Pino({
      redact: ['DATABASE_CONNECTION'],
      level: 'trace',
      transport: {
        target: 'pino-pretty'
      }
    }),
    ignoreTrailingSlash: true,
    keepAliveTimeout: 300_000,
    requestTimeout: 300_000
  });

  fastifyInstance.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 5, // 5mb- max file size
      fieldNameSize: 100, // 100 bytes- max field name size
      fields: 10, // 10 files- max number of fields
      fieldSize: 100, // 100 bytes- max field value size
      files: 2, // 5 files- max number of files
    },
    attachFieldsToBody: true
  });

  fastifyInstance.register(Helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://cdn.globalcare.vn'],
      },
    },
  });

  fastifyInstance.register(rateLimit, {
    max: 10_000,
    timeWindow: '1 minute'
  })

  fastifyInstance.register(FormBody, {
    parser: str => QS.parse(str)
  });

  fastifyInstance.register(Cors, {
    origin: (origin, cb) => {
      cb(null, true);
    },
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Connection',
      'Authorization',
      'Host',
      'Origin',
      'Referer',
      'User-Agent',
      'X-Requested-With',
      'X-Api-Client',
      'X-Api-Stime',
      'X-Api-Nonce'
    ],
    credentials: true,
  })

  fastifyInstance.register(Compress, {
    global: true, // Apply compression globally
    threshold: 1024, // Only compress responses larger than 1KB
  });

  // This loads all plugins defined in routes
  fastifyInstance.register(AutoLoad, {
    dir: path.join(__dirname, '../routes/v1'),
    options: {
      prefix: 'v1',
    }
  });

  // Fastify lifecycle hook to set up RabbitMQ connection
  fastifyInstance.addHook('onReady', async () => {
    await Promise.all([
      Redis.connect(),
      RabbitMQ.getChannel()
    ])
  });

  // Fastify lifecycle hook to close RabbitMQ connection
  fastifyInstance.addHook('onClose', async () => {
    await Promise.all([
      Redis.quitConnect(),
      RabbitMQ.closeConnection()
    ])
  });

  // init object authentication
  fastifyInstance.addHook('onRequest', async (request: FastifyRequest) => {
    request.authentication = {
      username: '',
      clientType: 'app'
    }
  })

  fastifyInstance.addHook('onSend', (request: FastifyRequest, reply: FastifyReply, payload: string, done) => {
    const contentType = reply.getHeader('Content-Type');
    if (request.method === 'OPTIONS' || contentType === 'text/html')
      return done();

    const payloadJson = JSON.parse(payload);
    reply.statusCode = payloadJson.statusCode;
    const err = null;
    const response = new responseHandler(payloadJson);

    done(err, JSON.stringify(response.get()))
  })

  return fastifyInstance;
}