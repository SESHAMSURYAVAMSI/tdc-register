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

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Holiday) => void;
}

export default function HolidayFormAdd({ open, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Holiday>({
    defaultValues: { no: 0, occasion: '', date: '', day: '' },
  });

  const submitHandler = (data: Holiday) => {
    onSubmit(data);
    onClose();
    reset(); // reset after close
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            Add New Holiday
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 gap-6 px-6 pt-6 pb-24">
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

            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" className="bg-[#00694A] hover:bg-[#004d36] text-white">
              Add Holiday
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
