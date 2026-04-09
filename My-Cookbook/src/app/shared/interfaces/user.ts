export interface User {
  _id: string;
  username: string;
  email: string;
  recipes?: string[];
  created_at?: string;
}

export interface UserForAuth extends User {
  password: string;
}
