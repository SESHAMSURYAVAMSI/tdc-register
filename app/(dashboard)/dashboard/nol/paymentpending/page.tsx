'use client';

import NOLPaymentPending from "@/app/components/dashboard/nol/paymentpending";
import { NOLPaymentPendingRecord } from "@/app/types/nol/payment";

const dummyData: NOLPaymentPendingRecord[] = [
  {
    membershipNumber: "NOL001",
    name: "Dr. Suresh Iyer",
    email: "suresh.iyer@example.com",
    mobile: "9876543210",
    date: "2024-07-01",
    category: "No Objection Certificate",
  },
  {
    membershipNumber: "NOL002",
    name: "Dr. Lakshmi R",
    email: "lakshmi.r@example.com",
    mobile: "9123456789",
    date: "2024-07-03",
    category: "Temporary NOC",
  },
];

export default function Page() {
  return <NOLPaymentPending data={dummyData} />;
}
