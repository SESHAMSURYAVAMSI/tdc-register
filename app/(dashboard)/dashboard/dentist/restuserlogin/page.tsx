import RestUserLogin from "@/app/components/dashboard/dentist/restuserlogin";
import { DentistRecord } from "@/app/types/dentist/restuserlogin";

const dummyData: DentistRecord[] = [
  {
    membershipNumber: "MEM001",
    name: "Dr. Kavya Rao",
    email: "kavya.rao@example.com",
    mobile: "9876543210",
    date: "2024-07-01",
    category: "Orthodontics",
  },
  {
    membershipNumber: "MEM002",
    name: "Dr. Anil Mehta",
    email: "anil.mehta@example.com",
    mobile: "9123456789",
    date: "2024-07-03",
    category: "Oral Surgery",
  },
];

export default function Page() {
  return <RestUserLogin data={dummyData} />;
}
