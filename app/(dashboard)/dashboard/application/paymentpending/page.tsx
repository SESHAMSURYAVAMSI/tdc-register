import PaymentPending from "@/app/components/dashboard/Application/paymentpending";
import { generateDummyPayments } from "@/app/data/generatepaymentpending";

const dummyData = generateDummyPayments();

export default function Page() {
  return <PaymentPending data={dummyData} />;
}
