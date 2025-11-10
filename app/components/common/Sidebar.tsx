'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

const menuItems = [
  {
    label: 'Application',
    isDropdown: true,
    children: [
      { label: 'Verification Pending', path: '/dashboard/application/verificationpending' },
      { label: 'Payment Pending', path: '/dashboard/application/paymentpending' },
      { label: 'Rejected Application', path: '/dashboard/application/rejectedapplication' },
      { label: 'Physical Verification', path: '/dashboard/application/physicalverification' },
    ],
  },
  {
    label: 'Renewal List',
    isDropdown: true,
    children: [
      { label: 'Verification Pending', path: '/dashboard/renewallist/verificationpending' },
      { label: 'Payment Pending', path: '/dashboard/renewallist/paymentpending' },
      { label: 'Rejected Application', path: '/dashboard/renewallist/rejectedapplication' },
    ],
  },
  {
    label: 'Dentist',
    isDropdown: true,
    children: [
      { label: 'Total Dentist', path: '/dashboard/dentist/total' },
      { label: 'Rest User Login', path: '/dashboard/dentist/restuserlogin' },
    ],
  },
  {
    label: 'Provisional Registration',
    isDropdown: true,
    children: [
      { label: 'Verification Pending', path: '/dashboard/provisional/verificationpending' },
      { label: 'Payment Pending', path: '/dashboard/provisional/paymentpending' },
      { label: 'Rejected Application', path: '/dashboard/provisional/rejectedapplication' },
      { label: 'TR Members', path: '/dashboard/provisional/trmembers' },
    ],
  },
  {
    label: 'Good Standard List',
    isDropdown: true,
    children: [
      { label: 'Verification Pending', path: '/dashboard/gsl/verificationpending' },
      { label: 'Payment Pending', path: '/dashboard/gsl/paymentpending' },
      { label: 'Approved', path: '/dashboard/gsl/approved' },
      { label: 'Rejected Application', path: '/dashboard/gsl/rejectedapplication' },
    ],
  },
  {
    label: 'No Objection List',
    isDropdown: true,
    children: [
      { label: 'Verification Pending', path: '/dashboard/nol/verificationpending' },
      { label: 'Payment Pending', path: '/dashboard/nol/paymentpending' },
      { label: 'Approved', path: '/dashboard/nol/approved' },
      { label: 'Rejected Application', path: '/dashboard/nol/rejectedapplication' },
    ],
  },
  {
    label: 'Appointments',
    isDropdown: true,
    children: [
      { label: "Today's", path: '/dashboard/appointments/todays' },
      { label: 'View Appointments', path: '/dashboard/appointments/view' },
      { label: 'Holidays', path: '/dashboard/appointments/holidays' },
    ],
  },
  {
    label: 'News',
    isDropdown: true,
    children: [
      { label: 'Announcements', path: '/dashboard/news/announcements' },
      { label: 'Events', path: '/dashboard/news/events' },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <aside className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-white shadow p-6 font-poppins z-40 hidden md:flex flex-col">
      

      {/* Menu Items */}
      <div className="space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              type="button"
              onClick={() => toggleDropdown(item.label)}
              className="cursor-pointer w-full flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium text-left hover:bg-gray-100 text-gray-700"
            >
              <span>{item.label}</span>
              {openDropdown === item.label ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openDropdown === item.label && (
              <div className="pl-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <button
                    key={child.label}
                    type="button"
                    onClick={() => router.push(child.path)}
                    className={`cursor-pointer block w-full text-left px-3 py-1 rounded-md text-sm ${
                      pathname === child.path
                        ? 'bg-blue-100 text-[#00694A] font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
