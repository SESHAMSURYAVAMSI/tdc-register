"use client";

import { useMemo, useState } from "react";
import { TodayAppointmentRecord } from "@/app/types/appointments/today";
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
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface Props {
  data: TodayAppointmentRecord[];
}

const ITEMS_PER_PAGE = 10;

export default function TodayAppointments({ data }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  // ---- CSV helpers ----
  const escapeCSV = (value: unknown) => {
    const str = String(value ?? "");
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const buildCSV = (rows: TodayAppointmentRecord[]) => {
    const headers = [
      "Application Number",
      "Membership Number",
      "Type",
      "Name",
      "Email",
      "Mobile",
      "Time & Date",
      "Category",
    ];
    const lines = [
      headers.join(","),
      ...rows.map((r) =>
        [
          escapeCSV(r.applicationNumber),
          escapeCSV(r.membershipNumber),
          escapeCSV(r.type),
          escapeCSV(r.name),
          escapeCSV(r.email),
          escapeCSV(r.mobile),
          escapeCSV(r.timeAndDate),
          escapeCSV(r.category),
        ].join(",")
      ),
    ];
    return "\uFEFF" + lines.join("\n");
  };

  const downloadCSV = () => {
    const csv = buildCSV(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `today_appointments_${dateStamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      {/* Toolbar: Search + Download */}
      <div className="p-4 border-b flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          placeholder="Search by any field"
          className="w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="md:ml-auto">
          <Button
            onClick={downloadCSV}
            className="bg-[#00694A] text-white hover:opacity-90 w-full md:w-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="w-full table-auto text-sm">
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
                No matching records found.
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
