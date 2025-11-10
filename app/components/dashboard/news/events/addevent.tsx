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
import { EventRecord } from "@/app/types/news/events";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventRecord) => void;
}

export default function AddEvent({ open, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventRecord>({
    defaultValues: {
      eventName: "",
      startDate: "",
      endDate: "",
      venue: "",
      cmePoints: "",
      website: "",
    },
  });

  const handleFormSubmit = (data: EventRecord) => {
    onSubmit(data);
    onClose();
    reset();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            Add Event
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-1 gap-6 px-6 pt-6 pb-24"
        >
          <div>
            <Label className="block mb-2">Event Name</Label>
            <Input {...register("eventName", { required: true })} />
            {errors.eventName && (
              <p className="text-sm text-red-500">Event name is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block mb-2">Start Date</Label>
              <Input type="date" {...register("startDate", { required: true })} />
              {errors.startDate && (
                <p className="text-sm text-red-500">Start date is required</p>
              )}
            </div>
            <div>
              <Label className="block mb-2">End Date</Label>
              <Input type="date" {...register("endDate", { required: true })} />
              {errors.endDate && (
                <p className="text-sm text-red-500">End date is required</p>
              )}
            </div>
          </div>

          <div>
            <Label className="block mb-2">Venue</Label>
            <Input {...register("venue", { required: true })} />
            {errors.venue && (
              <p className="text-sm text-red-500">Venue is required</p>
            )}
          </div>

          <div>
            <Label className="block mb-2">CME Points</Label>
            <Input
              {...register("cmePoints", { required: true })}
              placeholder="e.g., 5"
            />
            {errors.cmePoints && (
              <p className="text-sm text-red-500">CME points are required</p>
            )}
          </div>

          <div>
            <Label className="block mb-2">Website</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              {...register("website", {
                required: true,
                pattern:
                  /^(https?:\/\/)?([^\s.]+\.[^\s]{2,}|localhost[:?\d]*)\S*$/i,
              })}
            />
            {errors.website && (
              <p className="text-sm text-red-500">Valid website is required</p>
            )}
          </div>

          <div className="fixed bottom-0 w-full sm:max-w-[50vw] bg-white border-t p-6 flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#00694A] hover:bg-[#004d36] text-white">
              Add Event
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
