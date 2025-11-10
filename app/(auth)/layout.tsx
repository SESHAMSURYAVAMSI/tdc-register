// app/(auth)/layout.tsx

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  description: "Login or Signup to Telangana Dental Council",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#09e5ab] to-[#e6fff5]">
      <div className="flex w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-white overflow-y-auto">
          {children}
        </div>

        {/* Right: Image */}
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="/images/tdcimage.jpg"
            alt="Dental Council illustration"
            fill
            className="object-cover rounded-r-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
