import Announcements from "@/app/components/dashboard/news/announcements/announcements";
import { Announcement } from "@/app/types/news/announcements";

const dummyData: Announcement[] = [
  { title: "Board Meeting Scheduled", date: "2025-07-15" },
  { title: "Website Maintenance", date: "2025-07-18" },
];

export default function Page() {
  return <Announcements data={dummyData} />;
}
