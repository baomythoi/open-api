export interface PBPItem {
  id: number;
  code: string;
  providerId: number;
  providerCode: string;
  providerTitle: string;
  productId: number;
  productCode: string;
  productUrl: string;
  productTitle: string;
  productTitleSMS: string;
  productImage: string;
  descriptionHtml: string;
  platform: Record<string, any>;
  merchantId: Record<string, any>;
  maintenance: number;
  status: number;
  createdDate: string;
}