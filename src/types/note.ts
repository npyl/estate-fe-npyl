import { IUser } from "./user";

export interface INote {
  content: string;
  creator: IUser;
  createdAt: Date;
  updatedAt: Date;
}
