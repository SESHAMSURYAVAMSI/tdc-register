import VerificationPending from "@/app/components/dashboard/gsl/verificationpending";
import { GoodStandingVerificationRecord } from "@/app/types/gsl/verification";

const dummyData: GoodStandingVerificationRecord[] = [
  {
    applicationNumber: "APP001",
    membershipNumber: "MEM001",
    name: "Dr. Kavya Rao",
    email: "kavya.rao@example.com",
    mobile: "9876543210",
    date: "2024-07-10",
    category: "Good Standing",
  },
  {
    applicationNumber: "APP002",
    membershipNumber: "MEM002",
    name: "Dr. Anil Mehta",
    email: "anil.mehta@example.com",
    mobile: "9123456789",
    date: "2024-07-12",
    category: "Good Standing",
  },
];

export default function Page() {
  return <VerificationPending data={dummyData} />;
}
