export type sid = string;

export interface User {
  id: sid;
  name: string;
  friendCount: number;
  color: string;
}

export interface ActiveUser extends User {
  friends: Friend[];
  groups: Group[];
  email: string;
  phoneNumber: string;
}

export interface Group {
  members: Friend[];
  name: string;
  color: string;
  chat: Chat[];
}

export interface Chat {
  text: string;
  user: sid;
}

export interface Friend extends User {
  chat: Chat[];
}
