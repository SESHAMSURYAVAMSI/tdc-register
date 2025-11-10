"use client";

import { useMemo, useState } from "react";
import { PastAppointmentRecord } from "@/app/types/appointments/view";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  // The data prop now contains ALL appointments (past and upcoming)
  data: PastAppointmentRecord[];
}

const ITEMS_PER_PAGE = 10;

export default function ViewAppointments({ data }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // New state to manage the filter type
  const [filterType, setFilterType] = useState<'all' | 'past' | 'upcoming'>('all');

  const filtered = useMemo(() => {
    const now = new Date();
    
    // First, filter by the search term
    const searchFiltered = data.filter((item) =>
      Object.values(item).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    );

    // Then, apply the time-based filter
    if (filterType === 'all') {
      return searchFiltered;
    }

    return searchFiltered.filter((item) => {
      const appointmentDate = new Date(item.timeAndDate);
      if (filterType === 'past') {
        return appointmentDate < now;
      }
      if (filterType === 'upcoming') {
        return appointmentDate >= now;
      }
      return true; // Should not be reached, but good practice
    });
  }, [data, search, filterType]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  // Handler for filter buttons
  const handleFilterChange = (type: 'all' | 'past' | 'upcoming') => {
    setFilterType(type);
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      <div className="p-4 border-b flex flex-col md:flex-row md:items-center gap-4">
        {/* Search Bar */}
        <Input
          placeholder="Search by any field"
          className="w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        
        {/* Filter Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            onClick={() => handleFilterChange('all')}
            className={filterType === 'all' ? 'bg-[#00694A] text-white' : 'text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white'}
          >
            All
          </Button>
          <Button
            variant={filterType === 'past' ? 'default' : 'outline'}
            onClick={() => handleFilterChange('past')}
            className={filterType === 'past' ? 'bg-[#00694A] text-white' : 'text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white'}
          >
            Past
          </Button>
          <Button
            variant={filterType === 'upcoming' ? 'default' : 'outline'}
            onClick={() => handleFilterChange('upcoming')}
            className={filterType === 'upcoming' ? 'bg-[#00694A] text-white' : 'text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white'}
          >
            Upcoming
          </Button>
        </div>
      </div>

      <Table className="w-full text-sm table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Application Number</TableHead>
            <TableHead className="text-center">Membership Number</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Mobile</TableHead>
            <TableHead className="text-center">Time & Date</TableHead>
            <TableHead className="text-center">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{item.applicationNumber}</TableCell>
                <TableCell className="text-center">{item.membershipNumber}</TableCell>
                <TableCell className="text-center">{item.type}</TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.email}</TableCell>
                <TableCell className="text-center">{item.mobile}</TableCell>
                <TableCell className="text-center">{item.timeAndDate}</TableCell>
                <TableCell className="text-center">{item.category}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                No past appointments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 border-t">
          <p className="text-sm text-gray-600">
            Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)} to{" "}
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} records
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
    </div>
  );
}
