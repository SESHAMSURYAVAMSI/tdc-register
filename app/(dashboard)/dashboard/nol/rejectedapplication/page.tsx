"use client";

import RejectedNOCList from "@/app/components/dashboard/nol/rejected";

// Define the type for NOC records to be consistent with the component's props
export interface NOCRecord {
  applicationNumber: string;
  membershipNumber: string;
  name: string;
  email: string;
  mobile: string;
  date: string;
  category: string;
}

// Two dummy entries for NOC records
const dummyData: NOCRecord[] = [
  {
    applicationNumber: "AP-NOC-001",
    membershipNumber: "MN-NOC-001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    mobile: "9000111222",
    date: "2025-06-20",
    category: "Transfer BDS",
  },
  {
    applicationNumber: "AP-NOC-002",
    membershipNumber: "MN-NOC-002",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    mobile: "9222333444",
    date: "2025-06-18",
    category: "Transfer MDS",
  },
  {
    applicationNumber: "AP-NOC-003",
    membershipNumber: "MN-NOC-003",
    name: "Peter Jones",
    email: "peter.j@example.com",
    mobile: "9333444555",
    date: "2025-06-17",
    category: "Provisional",
  },
  {
    applicationNumber: "AP-NOC-004",
    membershipNumber: "MN-NOC-004",
    name: "Susan Davis",
    email: "susan.d@example.com",
    mobile: "9444555666",
    date: "2025-06-16",
    category: "Transfer BDS + New MDS",
  },
];

export default function RejectedNOCListPage() {
  return (
    <div className="p-6">
     
      <RejectedNOCList data={dummyData} />
    </div>
  );
}
