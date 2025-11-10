import PaymentPending from "@/app/components/dashboard/gsl/paymentpending";
import { GoodStandingPaymentRecord } from "@/app/types/gsl/payment";

const dummyData: GoodStandingPaymentRecord[] = [
  {
    membershipNumber: "MEM001",
    name: "Dr. Kavya Rao",
    email: "kavya.rao@example.com",
    mobile: "9876543210",
    date: "2024-07-10",
    category: "Good Standing",
  },
  {
    membershipNumber: "MEM002",
    name: "Dr. Anil Mehta",
    email: "anil.mehta@example.com",
    mobile: "9123456789",
    date: "2024-07-12",
    category: "Good Standing",
  },
];

export default function Page() {
  return <PaymentPending data={dummyData} />;
}
