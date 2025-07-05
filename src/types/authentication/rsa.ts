export interface DecryptData {
  clientCode: string | string[];
  data: any;
}

export interface HeaderKey {
  xApiClient: string | string[];
  xApiSecret: string | string[];
  xApiKey: string | string[];
  example?: boolean;
}