import RenewalVerificationPending from "@/app/components/dashboard/RenewalList/verificationpending";
import { RenewalRecord } from "@/app/types/renewalvp";

const dummyData: RenewalRecord[] = [
  {
    id: "1",
    membershipNumber: "M-1001",
    name: "Dr. Kavitha Rao",
    email: "kavitha@example.com",
    mobile: "9876543210",
    date: "2025-06-15",
    category: "Annual Renewal",
  },
  {
    id: "2",
    membershipNumber: "M-1002",
    name: "Dr. Arjun Mehta",
    email: "arjun@example.com",
    mobile: "9123456789",
    date: "2025-06-20",
    category: "Re-Registration",
  },
];

export default function Page() {
  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-semibold text-[#00694A] text-center mb-6">
        Renewal Verification Pending
      </h1> */}
      <RenewalVerificationPending data={dummyData} />
    </div>
  );
}
