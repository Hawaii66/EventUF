import { Business } from "./Business";

export interface Event {
  name: string;
  tagline: string;
  description: string;
  image: string;
  calendar: Calendar;
  location: Location;
  attendees: number;
  price: number;
  sponsored: boolean;
  tags: string[];
}

export type Calendar = { icon: string } & (
  | { type: "OneDay"; day: number }
  | { type: "Range"; start: number; end: number }
);

export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
}
