export interface User{
  _id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  username: string;
  email: string;
  password: string;
}