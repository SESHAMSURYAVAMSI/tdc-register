'use client';

import { useState } from 'react';
import HolidayTable from './holidaytable';
import HolidayFormAdd from './holidayformadd';
import HolidayFormEdit from './holidayformedit';
import { Holiday } from '@/app/types/appointments/holiday';

const initialHolidays: Holiday[] = [
  { no: 1, occasion: 'NEW YEAR', date: '2025-01-01', day: 'WEDNESDAY' },
  { no: 2, occasion: 'BHOGI', date: '2025-01-13', day: 'MONDAY' },
  { no: 3, occasion: 'SANRANTHI/PONGAL', date: '2025-01-14', day: 'TUESDAY' },
  { no: 4, occasion: 'REPUBLIC DAY', date: '2025-01-26', day: 'SUNDAY' },
  { no: 5, occasion: 'MAHASHIVARATHI', date: '2025-02-26', day: 'WEDNESDAY' },
  { no: 6, occasion: 'HOLI', date: '2025-03-14', day: 'FRIDAY' },
  { no: 7, occasion: 'UGADI', date: '2025-03-30', day: 'SUNDAY' },
  { no: 8, occasion: 'RAMZAN', date: '2025-03-31', day: 'MONDAY' },
  { no: 9, occasion: 'FOLLOWING DAY OF RAMZAN', date: '2025-04-01', day: 'TUESDAY' },
  { no: 10, occasion: "BABU JAGJIVANRAM’S BIRTHDAY", date: '2025-04-05', day: 'SATURDAY' },
  { no: 11, occasion: 'SRI RAMA NAVAMI', date: '2025-04-06', day: 'SUNDAY' },
  { no: 12, occasion: 'DR. B.R AMBEDKAR’S BIRTHDAY', date: '2025-04-14', day: 'MONDAY' },
  { no: 13, occasion: 'GOOD FRIDAY', date: '2025-04-18', day: 'FRIDAY' },
  { no: 14, occasion: 'BAKRID (EID-UI-AZHA)', date: '2025-06-07', day: 'SATURDAY' },
  { no: 15, occasion: 'MOHARRUM', date: '2025-07-06', day: 'SUNDAY' },
  { no: 16, occasion: 'BONALU', date: '2025-07-21', day: 'MONDAY' },
  { no: 17, occasion: 'INDEPENDENCE DAY', date: '2025-08-15', day: 'FRIDAY' },
  { no: 18, occasion: 'SRI KRISHNASHTAMI', date: '2025-08-16', day: 'SATURDAY' },
  { no: 19, occasion: 'VINAYAKA CHAVITHI', date: '2025-08-27', day: 'WEDNESDAY' },
  { no: 20, occasion: 'EID MILAD-UN-NABI', date: '2025-09-21', day: 'FRIDAY' },
  { no: 21, occasion: 'BATHUKAMMA DAY', date: '2025-09-21', day: 'SUNDAY' },
  { no: 22, occasion: 'MAHATMA GANDHI JAYANTHI', date: '2025-10-02', day: 'THURSDAY' },
  { no: 23, occasion: 'VIJAYA DASAMI', date: '2025-10-03', day: 'FRIDAY' },
  { no: 24, occasion: 'DEEPAVALI', date: '2025-10-20', day: 'FRIDAY' },
  { no: 25, occasion: 'KARTHIKA PURNIMA', date: '2025-11-05', day: 'WEDNESDAY' },
  { no: 26, occasion: 'CHRISTMAS', date: '2025-12-25', day: 'THURSDAY' },
  { no: 27, occasion: 'BOXING DAY', date: '2025-12-26', day: 'FRIDAY' },
];

export default function HolidayPage() {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);

  const handleAddNew = () => {
    setEditingHoliday(null);
    setDrawerOpen(true);
  };

  const handleEdit = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    setDrawerOpen(true);
  };

  const handleDelete = (holidayToDelete: Holiday) => {
    const filtered = holidays.filter(h => h.no !== holidayToDelete.no);
    updateAndSort(filtered);
  };

  const handleSubmit = (holiday: Holiday) => {
    let updatedList: Holiday[];

    if (editingHoliday) {
      updatedList = holidays.map((h) =>
        h.no === editingHoliday.no ? { ...h, ...holiday } : h
      );
    } else {
      updatedList = [...holidays, { ...holiday }];
    }

    updateAndSort(updatedList);
  };

  const updateAndSort = (list: Holiday[]) => {
    const sorted = [...list].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const reNumbered = sorted.map((h, i) => ({ ...h, no: i + 1 }));
    setHolidays(reNumbered);
    setDrawerOpen(false);
    setEditingHoliday(null);
  };

  return (
    <main className="w-full "> {/* The main container now has padding */}
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 text-center">
        Holiday List
      </h1>
      
      {/* The inner div now occupies the full width */}
      <div className="w-full ">
        <HolidayTable
          data={holidays}
          onEdit={handleEdit}
          onAddNew={handleAddNew} 
        />

        {editingHoliday ? (
          <HolidayFormEdit
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            defaultValues={editingHoliday}
          />
        ) : (
          <HolidayFormAdd
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
}
