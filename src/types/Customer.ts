export type Status = "Active" | "Inactive";

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: Status;
  createdAt: string; // ISO string for "Newest" sorting
}
