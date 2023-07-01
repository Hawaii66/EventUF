import { Business } from "./Business";

export interface Event {
  name: string;
  description: string;
  start: number;
  end: number;
  price: number;
  business: Business;
  type: string;
  sponsored: boolean;
  colaboration: Business | null;
  id: number;
  image: string;
}
