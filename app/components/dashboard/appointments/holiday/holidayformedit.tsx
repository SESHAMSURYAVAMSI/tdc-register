'use client';

import { useForm } from 'react-hook-form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Holiday } from '@/app/types/appointments/holiday';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Holiday) => void;
  onDelete: (data: Holiday) => void;
  defaultValues: Holiday;
}

export default function HolidayFormEdit({
  open,
  onClose,
  onSubmit,
  onDelete,
  defaultValues,
}: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Holiday>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleUpdate = (data: Holiday) => {
    onSubmit(data);
    onClose();
  };

  const handleDelete = () => {
    onDelete(defaultValues);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            Edit Holiday
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(handleUpdate)} className="grid grid-cols-1 gap-6 px-6 pt-6 pb-24">
          <div>
            <Label className="block mb-2">Occasion / Festival</Label>
            <Input {...register('occasion', { required: true })} />
            {errors.occasion && <p className="text-sm text-red-500">Occasion is required</p>}
          </div>
          <div>
            <Label className="block mb-2">Date</Label>
            <Input type="date" {...register('date', { required: true })} />
            {errors.date && <p className="text-sm text-red-500">Date is required</p>}
          </div>
          <div>
            <Label className="block mb-2">Day</Label>
            <Input {...register('day', { required: true })} />
            {errors.day && <p className="text-sm text-red-500">Day is required</p>}
          </div>

          <div className="fixed bottom-0 w-full sm:max-w-[50vw] bg-white border-t p-6 flex justify-between">
            <Button variant="outline" type="button" onClick={onClose}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button type="button" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
                Delete
              </Button>
              <Button type="submit" className="bg-[#00694A] hover:bg-[#004d36] text-white">
                Update
              </Button>
            </div>
          </div>
        </form>
      </SheetContent> 
    </Sheet>
  );
}
