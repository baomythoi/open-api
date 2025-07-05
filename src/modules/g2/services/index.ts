import BaseService from "@core/base.service";

// ultil
import G2 from '@utils/g2';
import FormData from 'form-data';

// interface
import { FuncResponse } from '@interfaces/response';
import {
  UploadPrivateIdParams
} from '@interfaces/g2/upload.interface';

export default new class G2Service extends BaseService {
  constructor() {
    super();
  }

  async upload(params: UploadPrivateIdParams): Promise<FuncResponse<object>> {
    const uploadData = new FormData();
    uploadData.append('path', params.path);
    uploadData.append('storage', params.storage);
    uploadData.append('file', params.file, {
      filename: params.filename,
      contentType: params.mimetype
    });

    const uploadG2Result = await G2.upload(uploadData);

    return uploadG2Result;
  }
}