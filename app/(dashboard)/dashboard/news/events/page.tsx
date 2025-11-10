import Events from "@/app/components/dashboard/news/events";
import { EventRecord } from "@/app/types/news/events";

const dummyData: EventRecord[] = [
  {
    eventName: "National Dental Conference",
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    venue: "Hyderabad International Convention Centre",
    cmePoints: "5",
    website: "https://ndc2025.org",
  },
  {
    eventName: "Oral Health Summit",
    startDate: "2025-09-15",
    endDate: "2025-09-16",
    venue: "Chennai Trade Center",
    cmePoints: "6",
    website: "https://oralhealthsummit.in",
  },
];

export default function Page() {
  return <Events data={dummyData} />;
}
