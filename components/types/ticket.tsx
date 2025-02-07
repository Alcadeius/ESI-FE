import { IActivity } from "./activity";

export interface ITicket {
  id: number;
  start_at: string;
  end_at: string;
  price: number;
  quantity: number;
  name: string;
  created_at: string;
  updated_at: string;
  activity: IActivity
}