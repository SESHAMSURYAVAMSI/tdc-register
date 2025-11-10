'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function DashboardHeader() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 bg-[#FFFFFF] border-b border-gray-200 px-6 flex items-center justify-between font-poppins shadow">
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <Image
          src="/images/header-logo1.png"
          alt="Telangana Dental Council Logo"
          width={180}
          height={40}
          className="h-auto w-auto object-contain"
        />
      </div>

      {/* Right: Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 focus:outline-none"
          aria-expanded={open}
          aria-haspopup="true"
        >
          <Image
            src="/images/dravatar.jpg"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
          />
          <ChevronDown className="text-gray-600 w-4 h-4" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-4 py-3 border-b">
              <Image
                src="/images/dravatar.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  STAFF-1
                </p>
                
              </div>
            </div>

            {/* Actions */}
            <div className="divide-y">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  // Add routing logic here
                  console.log("Go to Profile Settings");
                }}
              >
                Profile Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  // Add logout logic here
                  console.log("Logout");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
