import VerificationPending from "@/app/components/dashboard/provisional/verificationpending";
import { ProvisionalVerificationRecord } from "@/app/types/provisional/verification";

const dummyData: ProvisionalVerificationRecord[] = [
  {
    applicationNumber: "APP001",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    mobile: "9876543210",
    date: "2024-07-14",
    category: "Provisional Registration",
  },
  {
    applicationNumber: "APP002",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    mobile: "9123456789",
    date: "2024-07-10",
    category: "Transfer BDS",
  },
];

export default function Page() {
  return <VerificationPending data={dummyData} />;
}
