'use client';

import VerificationPending from "@/app/components/dashboard/nol/verificationpending";
import { NOCVerificationRecord } from "@/app/types/nol/verification";

const dummyData: NOCVerificationRecord[] = [
  {
    applicationNumber: "APP001",
    membershipNumber: "MEM001",
    name: "Dr. Asha Reddy",
    email: "asha.reddy@example.com",
    mobile: "9876543210",
    date: "2024-08-01",
    category: "No Objection Certificate",
  },
  {
    applicationNumber: "APP002",
    membershipNumber: "MEM002",
    name: "Dr. Raj Mehra",
    email: "raj.mehra@example.com",
    mobile: "9123456789",
    date: "2024-08-03",
    category: "No Objection Certificate",
  },
];

export default function Page() {
  return <VerificationPending data={dummyData} />;
}
