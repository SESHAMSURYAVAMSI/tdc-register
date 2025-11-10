import RenewalPaymentPending from "@/app/components/dashboard/RenewalList/paymentpending";
import { RenewalPaymentRecord } from "@/app/types/renewalpaymentpending";

// Dummy records
const dummyData: RenewalPaymentRecord[] = [
  {
    id: "1",
    membershipNumber: "M-5001",
    name: "Dr. Meena Kapoor",
    email: "meena.kapoor@example.com",
    mobile: "9876543210",
    date: "2025-06-10",
    category: "Renewal",
  },
  {
    id: "2",
    membershipNumber: "M-5002",
    name: "Dr. Vikram Joshi",
    email: "vikram.joshi@example.com",
    mobile: "9123456789",
    date: "2025-06-12",
    category: "Late Renewal",
  },
];

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#00694A] text-center mb-6">
        Renewal Payment Pending
      </h1>
      <RenewalPaymentPending data={dummyData} />
    </div>
  );
}
