export interface ILoginCredentials {
  email: string;
  password: string;
  captcha: string;
}

export interface ISignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  occupation: string;
  captcha: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface IResetPasswordCredentials {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}
