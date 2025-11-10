"use client";

import { useState, useMemo } from "react";
import { NOLApprovedRecord } from "@/app/types/nol/approved";
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
import { FileDown, ChevronLeft, ChevronRight } from "lucide-react";
import jsPDF from "jspdf";

interface Props {
  data: NOLApprovedRecord[];
}

const ITEMS_PER_PAGE = 10;

export default function NOLApproved({ data }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleDownloadPDF = (record: NOLApprovedRecord) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("NOC Approval Certificate", 20, 20);
    doc.setFontSize(12);
    doc.text(`Application Number: ${record.applicationNumber}`, 20, 40);
    doc.text(`Membership Number: ${record.membershipNumber}`, 20, 50);
    doc.text(`Name: ${record.name}`, 20, 60);
    doc.text(`Email: ${record.email}`, 20, 70);
    doc.text(`Mobile: ${record.mobile}`, 20, 80);
    doc.text(`Date: ${record.date}`, 20, 90);
    doc.text(`Category: ${record.category}`, 20, 100);

    doc.save(`${record.membershipNumber}_noc_approval.pdf`);
  };

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      {/* Search */}
      <div className="p-4 border-b">
        <Input
          placeholder="Search by any field"
          className="w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <Table className="w-full table-auto text-sm">
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
          {paginated.length > 0 ? (
            paginated.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{item.applicationNumber}</TableCell>
                <TableCell className="text-center">{item.membershipNumber}</TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.email}</TableCell>
                <TableCell className="text-center">{item.mobile}</TableCell>
                <TableCell className="text-center">{item.date}</TableCell>
                <TableCell className="text-center">{item.category}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => handleDownloadPDF(item)}
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
