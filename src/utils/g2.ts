import ClientApi from '@utils/client-api';
import type FormData from 'form-data';
import { FuncResponse } from '@interfaces/response';

export default new class G2 {
  upload = async (uploadData: FormData): Promise<FuncResponse<object>> => {
    const uploadResult = await ClientApi.makeRequest({
      url: `${process.env.G2_URL}/upload`,
      headers: {
        ...uploadData.getHeaders(),
      },
      formData: uploadData
    })
    if (uploadResult.complete)
      return {
        statusCode: 200,
        success: true,
        data: {
          url: uploadResult.link
        }
      }

    return {
      statusCode: 500,
      success: false,
      message: uploadResult.message
    }
  }
}
