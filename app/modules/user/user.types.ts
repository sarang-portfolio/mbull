export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  occupation: string;
  securityQuestion: string;
  securityAnswer: string;
  refreshToken?: string;
  subscriptionDetails: object[];
  subscriptionType: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
