"use client";

import { useState, useMemo } from "react";
import { Announcement } from "@/app/types/news/announcements";
import AddAnnouncement from "./addannouncement";
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

interface Props {
  data: Announcement[];
}

export default function Announcements({ data }: Props) {
  const [search, setSearch] = useState("");
  const [showSheet, setShowSheet] = useState(false);
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>(data);

  const filtered = useMemo(() => {
    return allAnnouncements.filter((item) =>
      Object.values(item).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allAnnouncements]);

  const handleAdd = (newAnnouncement: Announcement) => {
    setAllAnnouncements((prev) => [...prev, newAnnouncement]);
  };

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      {/* Top Controls */}
      <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search announcements"
          className="w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
          onClick={() => setShowSheet(true)}
        >
          + Add Announcement
        </Button>
      </div>

      {/* Table */}
      <Table className="w-full text-sm table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{item.title}</TableCell>
                <TableCell className="text-center">{item.date}</TableCell>
                <TableCell className="text-center text-blue-600 underline cursor-pointer">
                  View
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                No announcements found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Sheet */}
      <AddAnnouncement open={showSheet} onClose={() => setShowSheet(false)} onSubmit={handleAdd} />
    </div>
  );
}
