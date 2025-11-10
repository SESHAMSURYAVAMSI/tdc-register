import { faker } from "@faker-js/faker";
import { VerificationRecord } from "@/app/types/verification";

// Updated with dental-specific categories
export function generateDummyVerifications(count = 30): VerificationRecord[] {
  const categories = [
    "Provisional Registration",
    "Bachelor of Dental Surgery (BDS) from Telangana",
    "Transfer BDS (BDS registrant - from other state dental councils in India)",
    "Transfer BDS + New MDS",
    "Transfer MDS (MDS registrant - from other state dental councils in India)",
    "Master of Dental Surgery (MDS) from Telangana",
    "Non Indian Dentist Registration (Temporary)",
  ];

  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    trNumber: "TR-" + faker.number.int({ min: 1000, max: 9999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    mobile: "9" + faker.string.numeric(9),
    date: faker.date
      .between({ from: "2024-01-01", to: "2025-07-01" })
      .toISOString()
      .split("T")[0],
    category: faker.helpers.arrayElement(categories), // ✅ updated categories
  }));
}
