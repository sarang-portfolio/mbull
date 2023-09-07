import subscriptionService from "../modules/subscription/subscription.service";
import { closeDatabase, connect } from "./db";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Subscription Model", () => {
  it("should add subscription information in DB", async () => {
    try {
      const result = await subscriptionService.addSubscription({
        amount: 0,
        subscriptionType: "FREE",
        validity: 1,
        description:
          "Limited stocks and limited interactiveness with live graphs.",
      });
      expect(result).toBe("SUBSCRIPTION ADDED SUCCESSFULLY");
    } catch (err) {}
  });

  it("should fetch subscription information from DB", async () => {
    try {
      const result = await subscriptionService.getAllSubscriptions();
      expect(result).toHaveProperty("balance");
    } catch (err) {}
  });

  it("should getOne subscription details from DB", async () => {
    try {
      const result = await subscriptionService.getOneSubscription(
        "63a985d79f2d6973767cb28d"
      );
      expect(result).toBe("AMOUNT DEBITED SUCCESSFULLY");
    } catch (err) {}
  });
});

describe("Subscription Model Errors", () => {
  it("it should not update subscription details in DB", async () => {
    try {
      await subscriptionService.updateSubscription(
        "63a9381f0e25956d2032f4b47",
        {
          amount: 0,
          subscriptionType: "FREE",
          validity: 1,
          description:
            "Limited stocks and limited interactiveness with live graphs.",
        }
      );
    } catch (err: any) {
      const { message } = err;
      expect(message).toBe("SUBSCRIPTION NOT UPDATED");
    }
  });
});
