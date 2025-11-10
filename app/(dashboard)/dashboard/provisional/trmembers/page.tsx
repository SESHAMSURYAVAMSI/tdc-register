'use client';

import TRMembers from "@/app/components/dashboard/provisional/trmembers";
import { TRMemberRecord } from "@/app/types/provisional/trmembers";

const dummyData: TRMemberRecord[] = [
  {
    trNumber: "TR001",
    name: "Dr. Anjali Verma",
    email: "anjali.verma@example.com",
    mobile: "9876543210",
    date: "2024-07-01",
    category: "Provisional Registration"
  },
  {
    trNumber: "TR002",
    name: "Dr. Ravi Teja",
    email: "ravi.teja@example.com",
    mobile: "9123456789",
    date: "2024-07-05",
    category: "Transfer BDS"
  }
];

export default function Page() {
  return <TRMembers data={dummyData} />;
}
