import PhysicalVerification from "@/app/components/dashboard/Application/physicalverification";
import { VerificationRecord } from "@/app/types/physical";

// Two hardcoded dummy entries
const dummyData: VerificationRecord[] = [
  {
    id: "1",
    trNumber: "TR-2023",
    name: "Anjali Mehra",
    email: "anjali.mehra@example.com",
    mobile: "9876543210",
    date: "2025-06-01",
    category: "Registration",
  },
  {
    id: "2",
    trNumber: "TR-2024",
    name: "Ravi Teja",
    email: "ravi.teja@example.com",
    mobile: "9123456789",
    date: "2025-06-02",
    category: "Good Standing",
  },
];

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#00694A] text-center mb-6">
        Physical Verification Pending
      </h1>
      <PhysicalVerification data={dummyData} />
    </div>
  );
}
