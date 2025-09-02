import { generateCustomers } from "../common/utils";
import { Customer } from "../types/Customer";

const USE_MOCK = true;

export async function fetchCustomers(): Promise<Customer[]> {
  if (USE_MOCK) {
    // Simulate network delay
    return new Promise((resolve) =>
      setTimeout(() => resolve(generateCustomers(120)), 800)
    );
  }

  // Replace with real API later
  const res = await fetch("/api/customers");
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}
