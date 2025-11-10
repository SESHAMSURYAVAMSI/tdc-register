"use client";

import { useMemo, useState } from "react";
import { GoodStandingApprovedRecord } from "@/app/types/gsl/approved";
import jsPDF from "jspdf";
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
import { ChevronLeft, ChevronRight, FileDown } from "lucide-react";

interface Props {
  data: GoodStandingApprovedRecord[];
}

const itemsPerPage = 10;

export default function ApprovedList({ data }: Props) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const downloadPDF = (row: GoodStandingApprovedRecord) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Member Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Application Number: ${row.applicationNumber}`, 20, 40);
    doc.text(`Membership Number: ${row.membershipNumber}`, 20, 50);
    doc.text(`Name: ${row.name}`, 20, 60);
    doc.text(`Email: ${row.email}`, 20, 70);
    doc.text(`Mobile: ${row.mobile}`, 20, 80);
    doc.text(`Date: ${row.date}`, 20, 90);
    doc.text(`Category: ${row.category}`, 20, 100);

    doc.save(`${row.membershipNumber}_details.pdf`);
  };

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      {/* Search bar */}
      <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2"
        />
      </div>

      {/* Table */}
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Application Number</TableHead>
            <TableHead className="text-center">Membership Number</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Mobile</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{row.applicationNumber}</TableCell>
                <TableCell className="text-center">{row.membershipNumber}</TableCell>
                <TableCell className="text-center">{row.name}</TableCell>
                <TableCell className="text-center">{row.email}</TableCell>
                <TableCell className="text-center">{row.mobile}</TableCell>
                <TableCell className="text-center">{row.date}</TableCell>
                <TableCell className="text-center">{row.category}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => downloadPDF(row)}
                  >
                    <FileDown className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </TableCell>
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
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
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
