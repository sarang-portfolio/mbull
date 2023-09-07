import authService from "../modules/auth/auth.service";
import { closeDatabase, connect } from "./db";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Auth", () => {
  describe("login", () => {
    it("should login user", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        const result = await authService.login({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
        });
        expect(result).toHaveProperty("accessToken");
        expect(result).toHaveProperty("refreshToken");
      } catch (err) {}
    });
  });

  describe("signUp", () => {
    it("should signup user", async () => {
      try {
        const result = await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        expect(result).toBe("USER SIGNUP SUCCESSFUL");
      } catch (err) {}
    });

    it("should throw error for user already exists", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
      } catch (err: any) {
        const { message } = err;
        expect(message).toBe("USER ALREADY EXISTS");
      }
    });
  });

  describe("forgotPassword", () => {
    it("should return success message", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        const result = await authService.forgotPassword(
          "sarang.kulkarni@coditas.com"
        );
        expect(result).toHaveProperty("securityQuestion", "securityAnswer");
      } catch (err) {}
    });
  });

  describe("resetPassword", () => {
    it("should return success message", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        const result = await authService.resetPassword({
          email: "sarang.kulkarni@coditas.com",
          newPassword: "123456",
          confirmNewPassword: "123456",
        });
        expect(result).toBe("Password reset successful");
      } catch (err) {}
    });
  });

  describe("changePassword", () => {
    it("should return success message", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        const result = await authService.changePassword(
          "63843dcd5de2a22a09393a18",
          "123456",
          "123456",
          "123456"
        );
        expect(result).toBe("Password changed successful");
      } catch (err) {}
    });
  });
});

describe("Auth Errors", () => {
  describe("login", () => {
    it("should throw error for invalid credentials", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        await authService.login({
          email: "sarang.kulkarni@coditas.com",
          password: "1234567",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
        });
      } catch (err: any) {
        expect(err.message).toBe("Invalid credentials");
      }
    });

    it("should throw error for user not found", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        await authService.login({
          email: "sarang.kulkarni@gmail.com",
          password: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
        });
      } catch (err: any) {
        expect(err.message).toBe("USER NOT FOUND");
      }
    });
  });

  describe("forgotPassword", () => {
    it("should return user not found", async () => {
      try {
        await authService.signUp({
          email: "sarang.kulkarni@coditas.com",
          password: "123456",
          confirmPassword: "123456",
          captcha:
            "03AEkXODCy18AOVrkDNQjD7kkrgt08R8MaB0l3fu1TN__294mhCDzYQfmJH7FyqTpIAR7Xq4IiQNRMsnaqkB9rYYXKezXtiZ6UzMl3feoo6U4z2c3MRpAlEjAPUSuGiV5Md0HKXkZ2DgIL9ik6GxanyQXbWhVKWHT7E5IiYFCo3CJeaxeUFhVs0rA_kGRFRjUOeQ8nO-oC1nD-2Gn4l8ypOBjg73cT8RrFUa0dBj3RwFubXEKxFIHOjO9xyVtw2UU8kdk5wTOrfxsD36SdhyInZFIAN_GmQEa-IIpPZGTsb52PIupX-2JTPuNvKx1x_m2VJ9nR8gMd1oieP1zwEmD55NzImcBviOi25-4603bWrNraKB_mbxrb-vJ00lN4bLmraWeOOloxWIShmYbro6KA-8drevO8e0smIKHn_GhCZhd8NAPmTDezc1mXm1myG3dwRwpM4EXrozoQlVw0j7_sbF-c7XyKAr_V5ItCgEwcPP5Ivxpgb6PDAyjohvTriW1gsneBufT07Ds5",
          name: "Sarang Kulkarni",
          phoneNumber: "1234567890",
          gender: "male",
          occupation: "Software Engineer",
          securityQuestion: "63837c2594ab0d4bf181cac7",
          securityAnswer: "Tommy",
        });
        await authService.forgotPassword("sarang.kulkarni@gmail.com");
      } catch (err: any) {
        expect(err.message).toBe("USER NOT FOUND");
      }
    });
  });
});
