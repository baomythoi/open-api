import AWS from 'aws-sdk';
import { FuncResponse } from '@interfaces/response';

export default new class CloudflareR2 {
  private readonly s3: AWS.S3;
  private readonly bucket: string;
  private readonly baseUrl: string;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.R2_ENDPOINT,
      accessKeyId: process.env.R2_ACCESS_KEY,
      secretAccessKey: process.env.R2_SECRET_KEY,
      signatureVersion: 'v4',
      region: 'auto'
    });
    this.bucket = process.env.R2_BUCKET as string;
    this.baseUrl = process.env.UPLOAD_BASE_URL || `${process.env.R2_ENDPOINT}/${this.bucket}`;
  }

  uploadBuffer = async (key: string, buffer: Buffer, contentType: string): Promise<FuncResponse<object>> => {
    try {
      await this.s3.putObject({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }).promise();

      return {
        statusCode: 200,
        success: true,
        data: { url: `${this.baseUrl}/${key}` }
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        success: false,
        message: err.message
      };
    }
  }

  uploadFile = async (key: string, stream: NodeJS.ReadableStream, contentType: string): Promise<FuncResponse<object>> => {
    try {
      await this.s3.upload({
        Bucket: this.bucket,
        Key: key,
        Body: stream,
        ContentType: contentType,
      }).promise();

      return {
        statusCode: 200,
        success: true,
        data: { url: `${this.baseUrl}/${key}` }
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        success: false,
        message: err.message
      };
    }
  }
};