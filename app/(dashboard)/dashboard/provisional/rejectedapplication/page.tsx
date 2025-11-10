"use client";

import RejectedProvisionalList from "@/app/components/dashboard/provisional/rejected";
import { ProvisionalVerificationRecord } from "@/app/types/provisional/verification";

// Two dummy entries for Provisional records
const dummyData: ProvisionalVerificationRecord[] = [
  {
    applicationNumber: "AP-1001",
    name: "John Doe",
    email: "john.d@example.com",
    mobile: "9988776655",
    date: "2025-06-15",
    category: "Provisional",
  },
  {
    applicationNumber: "AP-1002",
    name: "Jane Smith",
    email: "jane.s@example.com",
    mobile: "9191919191",
    date: "2025-06-12",
    category: "Transfer BDS",
  },
];

export default function RejectedProvisionalListPage() {
  return (
    <div className="p-6">
      
      <RejectedProvisionalList data={dummyData} />
    </div>
  );
}
