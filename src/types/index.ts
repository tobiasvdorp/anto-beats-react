export type INewUser = {
  name: string;
  email: string;
  password: string;
};

export type ILoginCredentials = {
  email: string;
  password: string;
};

export interface User {
  login: (email: string, password: string) => Promise<Session>;
  register: (name: string, email: string, password: string) => Promise<Session>;
}

export interface AppwriteError {
  message: string;
}
