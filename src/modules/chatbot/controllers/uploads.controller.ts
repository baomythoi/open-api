import BaseController from '@core/base.controller';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import path from 'path';

// interface

export default class Uploads extends BaseController {
  constructor() {
    super();
  }

  getFacebookAvatar = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { userId } = req.params as { userId: string };
      const filePath = path.join(
        __dirname,
        '..', '..', '..', '..', '..',
        'uploads', 'avatars', 'facebook', `${userId}.jpg`
      );

      if (!fs.existsSync(filePath)) {
        return {
          statusCode: 404,
          success: false,
          message: 'Avatar not found'
        };
      }

      const avatarBuffer = fs.readFileSync(filePath);

      reply.raw.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': avatarBuffer.length,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      reply.raw.end(avatarBuffer);
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        message: 'Internal server error'
      }
    }
  }

  getScenarioTemplate = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { locale } = req.query as { locale?: string };
      const lang = (!locale || locale === 'en') ? 'en' : 'vi';
  
      const templateFile = path.join(
        __dirname,
        '..', '..', '..', '..', '..',
        'uploads', 'scenarios', 'templates',
        `scenario_template_${lang}.xlsx`
      );
  
      if (!fs.existsSync(templateFile)) {
        reply.code(404).send({
          statusCode: 404,
          success: false,
          message: 'Scenario Template file not found',
        });
        return;
      }
  
      const timestamp = Math.floor(Date.now() / 1000);
  
      const fileBuffer = fs.readFileSync(templateFile);
  
      reply.raw.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="scenario_template_${lang}_${timestamp}.xlsx"`,
        'Content-Length': fileBuffer.length,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
  
      reply.raw.end(fileBuffer);
    } catch (error: any) {
      return {
        statusCode: 500,
        success: false,
        message: 'Internal server error'
      }
    }
  };
}