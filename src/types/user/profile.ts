// export interface UserProfile {

// }

export interface UserPortalProfile {
  uid: string;
  username: string;
  password?: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  roleCode?: string;
  merchantId?: number;
  agencyId?: number;
  providerId?: number;
  userId?: number;
  extraInfo?: Record<string, any>;
  status?: number;
  lastLogin?: string;
  updateDate?: string;
  createdDate?: string;
}