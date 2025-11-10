import VerificationPending from "@/app/components/dashboard/Application/verificationpending/verificationpending";
import { generateDummyVerifications } from "@/app/data/generateverificationpending";

const dummyData = generateDummyVerifications();

export default function Page() {
  return <VerificationPending data={dummyData} />;
}
