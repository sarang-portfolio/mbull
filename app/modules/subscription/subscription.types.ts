export interface ISubscription {
  _id?: string;
  amount: number;
  subscriptionType: string;
  validity: number;
  description: string;
  isDeleted?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserSubscription {
  _id: string;
  subscriptionDetails: object[];
}

export interface IUserSubscriptionDetails {
  _id?: string;
  subscriptionId?: string;
  startDate?: number;
  endDate?: number;
  status: string;
  isDeleted?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
