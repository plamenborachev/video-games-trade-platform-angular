export interface User{
  _id: string;
  username: string;
  email: string;
  telephone: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  _id: string;
  username: string;
  email: string;
  password: string;
  telephone: string;
}

export interface ProfileDetails {
  username: string;
  email: string;
  telephone: string;
}