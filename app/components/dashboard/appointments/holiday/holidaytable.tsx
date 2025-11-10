"use client";

import { useMemo, useState } from "react";
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
import { ChevronLeft, ChevronRight, PlusCircle, Pencil } from "lucide-react";

interface Holiday {
  no: number;
  occasion: string;
  date: string;
  day: string;
}

interface Props {
  data: Holiday[];
  onEdit: (holiday: Holiday) => void;
  onAddNew: () => void;
}

const itemsPerPage = 10;

export default function HolidayTable({ data, onEdit, onAddNew }: Props) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.occasion.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      {/* Top Bar */}
      <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-3">
        <Input
          placeholder="Search by occasion"
          className="w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button
          onClick={onAddNew}
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Holiday
        </Button>
      </div>

      {/* Table */}
      <Table className="w-full table-auto text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center px-2 py-2">SL No</TableHead>
            <TableHead className="text-center px-2 py-2">Occasion</TableHead>
            <TableHead className="text-center px-2 py-2">Date</TableHead>
            <TableHead className="text-center px-2 py-2">Day</TableHead>
            <TableHead className="text-center px-2 py-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((holiday) => (
              <TableRow key={holiday.no}>
                <TableCell className="text-center px-2 py-2">{holiday.no}</TableCell>
                <TableCell className="text-center px-2 py-2">{holiday.occasion}</TableCell>
                <TableCell className="text-center px-2 py-2">{holiday.date}</TableCell>
                <TableCell className="text-center px-2 py-2">{holiday.day}</TableCell>
                <TableCell className="text-center px-2 py-2">
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => onEdit(holiday)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
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
            Showing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}{" "}
            to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} records
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
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
