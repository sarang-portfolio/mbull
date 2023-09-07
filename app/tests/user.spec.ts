import { closeDatabase, connect } from "./db";
import userService from "../modules/user/user.service";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("User Model", () => {
  it("should fetch user's profile from DB", async () => {
    try {
      const result = await userService.userProfile("63c5171a990ee56655e7b696");
      expect(result).toBe("DATA INSERTED");
    } catch (err) {
      expect(err).toBe(null);
    }
  });
});
