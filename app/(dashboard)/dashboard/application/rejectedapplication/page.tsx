import RejectedApplications from "@/app/components/dashboard/Application/rejectedapplication";
import { VerificationRecord } from "@/app/types/rejected";

// Two dummy entries
const dummyData: VerificationRecord[] = [
  {
    id: "1",
    trNumber: "TR-1001",
    name: "Rohit Kumar",
    email: "rohit.k@example.com",
    mobile: "9876543210",
    date: "2025-06-10",
    category: "Provisional",
  },
  {
    id: "2",
    trNumber: "TR-1002",
    name: "Sneha Reddy",
    email: "sneha.r@example.com",
    mobile: "9123456780",
    date: "2025-06-05",
    category: "Renewal",
  },
];

export default function RejectedApplicationsPage() {
  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-semibold text-[#00694A] text-center mb-6">
        Rejected Applications
      </h1> */}
      <RejectedApplications data={dummyData} />
    </div>
  );
}
