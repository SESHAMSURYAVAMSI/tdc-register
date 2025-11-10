import ApprovedList from "@/app/components/dashboard/gsl/approved";
import { GoodStandingApprovedRecord } from "@/app/types/gsl/approved";

const dummyData: GoodStandingApprovedRecord[] = [
  {
    applicationNumber: "APP001",
    membershipNumber: "MEM001",
    name: "Dr. Ravi Teja",
    email: "ravi.teja@example.com",
    mobile: "9876543210",
    date: "2024-07-05",
    category: "Good Standing",
  },
  {
    applicationNumber: "APP002",
    membershipNumber: "MEM002",
    name: "Dr. Neha Sharma",
    email: "neha.sharma@example.com",
    mobile: "9123456789",
    date: "2024-07-08",
    category: "Good Standing",
  },
];

export default function Page() {
  return <ApprovedList data={dummyData} />;
}
