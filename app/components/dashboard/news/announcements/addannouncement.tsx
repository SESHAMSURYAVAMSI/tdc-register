"use client";

import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Announcement } from "@/app/types/news/announcements";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Announcement) => void;
}

export default function AddAnnouncement({ open, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Announcement>({
    defaultValues: { title: "", date: "" },
  });

  const handleFormSubmit = (data: Announcement) => {
    onSubmit(data);
    onClose();
    reset();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            Add Announcement
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-1 gap-6 px-6 pt-6 pb-24"
        >
          <div>
            <Label className="block mb-2">Title</Label>
            <Input {...register("title", { required: true })} />
            {errors.title && <p className="text-sm text-red-500">Title is required</p>}
          </div>
          <div>
            <Label className="block mb-2">Date</Label>
            <Input type="date" {...register("date", { required: true })} />
            {errors.date && <p className="text-sm text-red-500">Date is required</p>}
          </div>

          <div className="fixed bottom-0 w-full sm:max-w-[50vw] bg-white border-t p-6 flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#00694A] hover:bg-[#004d36] text-white">
              Add Announcement
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
