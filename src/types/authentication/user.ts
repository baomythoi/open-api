type clientType = 'app' | 'portal' | 'web';

export interface LoginParams {
  clientType: clientType;
  credentials: {
    username: string;
    password: string;
  }
}

export interface Authentication {
  username: string;
  clientType: clientType
}

export interface Register {
  username: string;
  password: string;
  fullname: string;
  phoneCode: string;
  phoneNumber: string;
  locale: string;
}