// components/dashboard/appointments/holidays/holiday.ts

export interface Holiday {
  no: number;            // Serial number (1, 2, 3,...)
  occasion: string;      // Festival or event name (e.g., "NEW YEAR")
  date: string;          // ISO date string (e.g., "2025-01-01")
  day: string;           // Day of the week (e.g., "WEDNESDAY")
}
