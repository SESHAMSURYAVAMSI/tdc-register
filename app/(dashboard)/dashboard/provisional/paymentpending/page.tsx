import PaymentPending from "@/app/components/dashboard/provisional/paymentpending";
import { ProvisionalPaymentRecord } from "@/app/types/provisional/payment";

const dummyData: ProvisionalPaymentRecord[] = [
  {
    name: "Rajesh R",
    email: "rajesh.r@example.com",
    mobile: "9876543210",
    category: "Provisional Registration"
  },
  {
    name: "Divya Mehta",
    email: "divya.mehta@example.com",
    mobile: "9123456789",
    category: "Transfer BDS"
  }
];

export default function Page() {
  return <PaymentPending data={dummyData} />;
}
