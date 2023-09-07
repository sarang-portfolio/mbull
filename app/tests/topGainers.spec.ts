import { closeDatabase, connect } from "./db";
import topGainersService from "../modules/topGainers/topGainers.service";
import { updateTopGainers } from "../../cron/app/utility/cron";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("topGainer Model", () => {
  it("should add topGainers stock in DB", async () => {
    try {
      const result = await updateTopGainers();
      expect(result).toBe("DATA INSERTED");
    } catch (err) {
      expect(err).toBe(null);
    }
  });
});
