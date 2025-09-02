import { baseCustomers } from "../data/customers.mock";
import { Customer } from "../types/Customer";

export const generateCustomers = (): Customer[] => {
  const companies = [
    "Microsoft",
    "Google",
    "Yahoo",
    "Adobe",
    "Tesla",
    "Facebook",
    "Amazon",
    "Apple",
  ];
  const countries = [
    "United States",
    "Brazil",
    "Germany",
    "India",
    "Israel",
    "France",
    "Japan",
    "Curaçao",
    "Kiribati",
    "Åland Islands",
    "Réunion",
    "Iran",
  ];
  const names = [
    "Eleanor Pena",
    "Albert Flores",
    "Savannah Nguyen",
    "Courtney Henry",
    "Wade Warren",
    "Jenny Wilson",
    "Darlene Robertson",
    "Annette Black",
    "Ralph Edwards",
    "Esther Howard",
    "Devon Lane",
    "Arlene McCoy",
  ];
  const data: Customer[] = [...baseCustomers];
  for (let i = 9; i <= 56; i++) {
    const name = names[i % names.length];
    const company = companies[i % companies.length];
    const email = `${name
      .split(" ")
      .join(".")
      .toLowerCase()}@${company.toLowerCase()}.com`;
    const phone = `(${200 + (i % 600)}) 555-${(1000 + i * 13) % 9999}`.padEnd(
      14,
      "0"
    );
    const country = countries[i % countries.length];
    const status: Status = i % 5 === 0 ? "Inactive" : "Active";
    const createdAt = new Date(Date.now() - i * 86400000).toISOString();
    data.push({
      id: String(i),
      name,
      company,
      phone,
      email,
      country,
      status,
      createdAt,
    });
  }
  return data;
};
