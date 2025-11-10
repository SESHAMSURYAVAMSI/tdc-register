"use client";

import RejectedRenewalList from "@/app/components/dashboard/RenewalList/rejected";
import { RenewalRecord } from "@/app/types/renewalvp";

// Two dummy entries for Renewal records
const dummyData: RenewalRecord[] = [
  {
    id: "1",
    membershipNumber: "MN-001",
    name: "John Doe",
    email: "john.d@example.com",
    mobile: "9988776655",
    date: "2025-06-15",
    category: "Provisional",
  },
  {
    id: "2",
    membershipNumber: "MN-002",
    name: "Jane Smith",
    email: "jane.s@example.com",
    mobile: "9191919191",
    date: "2025-06-12",
    category: "Transfer BDS",
  },
];

export default function RejectedRenewalListPage() {
  return (
    <div className="p-6">
      
      <RejectedRenewalList data={dummyData} />
    </div>
  );
}
