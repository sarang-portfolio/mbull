export type subscriptionType = "FREE" | "BASIC" | "PREMIUM";

export class SubscriptionType {
  constructor(public id: string, public name: subscriptionType) {}
}
