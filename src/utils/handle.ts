import formData from 'form-data';

export const buildFormData = (params: any) => {
  const data = new formData();

  for (const key in params) {
    if (key && params[key]) {
      data.append(key, params[key]);
    }
  }

  return data;
};