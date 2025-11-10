"use client";

import RejectedGSCList from "@/app/components/dashboard/gsl/rejected";

// Define the type for GSC records
export interface GSCRecord {
  applicationNumber: string;
  membershipNumber: string;
  name: string;
  email: string;
  mobile: string;
  date: string;
  category: string;
}

// Dummy entries for GSC records
const dummyData: GSCRecord[] = [
  {
    applicationNumber: "AP-GSC-001",
    membershipNumber: "MN-GSC-001",
    name: "Michael Chen",
    email: "michael.c@example.com",
    mobile: "9555666777",
    date: "2025-06-25",
    category: "Provisional",
  },
  {
    applicationNumber: "AP-GSC-002",
    membershipNumber: "MN-GSC-002",
    name: "Jessica White",
    email: "jessica.w@example.com",
    mobile: "9666777888",
    date: "2025-06-24",
    category: "Transfer BDS",
  },
  {
    applicationNumber: "AP-GSC-003",
    membershipNumber: "MN-GSC-003",
    name: "David Lee",
    email: "david.l@example.com",
    mobile: "9777888999",
    date: "2025-06-23",
    category: "Master of Dental Surgery (MDS) from Telangana",
  },
];

export default function RejectedGSCListPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#00694A] text-center mb-6">
        Rejected GSC Applications
      </h1>
      <RejectedGSCList data={dummyData} />
    </div>
  );
}

