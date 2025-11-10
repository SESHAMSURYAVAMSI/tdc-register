"use client";

import { useState, useMemo } from "react";
import { EventRecord } from "@/app/types/news/events";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddEvent from "@/app/components/dashboard/news/events/addevent";

interface Props {
  data: EventRecord[];
}

const ITEMS_PER_PAGE = 10;

export default function Events({ data }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showSheet, setShowSheet] = useState(false);
  const [allEvents, setAllEvents] = useState<EventRecord[]>(data);

  // not needed anymore but keeping in case you add details later
  // const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);

  const filtered = useMemo(() => {
    return allEvents.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [allEvents, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleAdd = (newEvent: EventRecord) => {
    setAllEvents((prev) => [...prev, newEvent]);
    setPage(1);
  };

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      {/* Top Controls */}
      <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search by any field"
          className="w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Button
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
          onClick={() => setShowSheet(true)}
        >
          + Add Event
        </Button>
      </div>

      {/* Table */}
      <Table className="w-full text-sm table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Event Name</TableHead>
            <TableHead className="text-center">Start Date</TableHead>
            <TableHead className="text-center">End Date</TableHead>
            <TableHead className="text-center">Venue</TableHead>
            <TableHead className="text-center">CME Points</TableHead>
            <TableHead className="text-center">Website</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{item.eventName}</TableCell>
                <TableCell className="text-center">{item.startDate}</TableCell>
                <TableCell className="text-center">{item.endDate}</TableCell>
                <TableCell className="text-center">{item.venue}</TableCell>
                <TableCell className="text-center">{item.cmePoints}</TableCell>

                {/* ✅ Visit button instead of link */}
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className="bg-[#00694A] hover:bg-[#004d36] text-white"
                    onClick={() => window.open(item.website, "_blank")}
                  >
                    Visit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                No matching events found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 border-t">
          <p className="text-sm text-gray-600">
            Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)} to{" "}
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} events
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Add Event Sheet */}
      <AddEvent
        open={showSheet}
        onClose={() => setShowSheet(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
}
