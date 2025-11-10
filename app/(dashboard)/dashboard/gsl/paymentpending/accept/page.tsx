"use client";

import { Button } from "@/components/ui/button";

export default function PaymentActionPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8 bg-white">
      <div>
        <h1 className="text-2xl font-semibold text-[#00694A] text-center mb-4">
          Payment Verification Page
        </h1>
        <p className="text-center text-gray-500">Payment details will be shown here.</p>
      </div>

      <div className="flex justify-center gap-6 mt-10">
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
          Approve
        </Button>
        <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">
          Reject
        </Button>
      </div>
    </div>
  );
}
