export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";

  phone?: string;
  address?: string;
  profile?: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}