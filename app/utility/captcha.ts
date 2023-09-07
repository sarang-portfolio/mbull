import fetch from "node-fetch";

export const verifyCaptcha = async (captcha: string) => {
  try {
    const { CAPTCHA_SECRET_KEY } = process.env;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${captcha}`;
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();
    if (!data.success) {
      return false;
    } else if (data.success) {
      return true;
    }
  } catch (err) {
    throw err;
  }
};
