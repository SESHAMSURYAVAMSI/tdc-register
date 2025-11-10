"use client";

import NOLApproved from "@/app/components/dashboard/nol/approved";
import { NOLApprovedRecord } from "@/app/types/nol/approved";

const dummyData: NOLApprovedRecord[] = [
  {
    applicationNumber: "APP-NOL-001",
    membershipNumber: "NOL001",
    name: "Dr. Kavitha Iyer",
    email: "kavitha.iyer@example.com",
    mobile: "9876543210",
    date: "2024-07-01",
    category: "NOC",
  },
  {
    applicationNumber: "APP-NOL-002",
    membershipNumber: "NOL002",
    name: "Dr. Vikas Sharma",
    email: "vikas.sharma@example.com",
    mobile: "9123456789",
    date: "2024-07-03",
    category: "Temporary NOC",
  },
];

export default function Page() {
  return <NOLApproved data={dummyData} />;
}
