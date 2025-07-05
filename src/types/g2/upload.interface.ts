import type { MultipartFile } from 'fastify-multipart';

export interface UploadFileParams {
  file: MultipartFile;
}

export interface UploadPrivateIdParams {
  path: string;
  file: MultipartFile | any;
  filename: string;
  mimetype: string;
  storage: 's3';
}
