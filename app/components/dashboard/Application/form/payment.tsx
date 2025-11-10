"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

interface Step4PaymentProps {
  onSubmit: () => void;
}

const Payment: React.FC<Step4PaymentProps> = ({ onSubmit }) => {
  const { getValues } = useFormContext();
  const applicantName = getValues("fullName") || "Applicant";

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
        <p className="text-gray-700 text-lg mb-4">
          Dear <span className="font-medium">{applicantName}</span>,
        </p>
        <p className="text-gray-600 mb-2">
          You are about to proceed with the registration fee payment. Please
          confirm your details in the previous step before continuing.
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Amount:</strong> ₹2,000.00
        </p>
      </div>
      <div className="flex justify-center pt-6">
        <Button
          type="button"
          onClick={onSubmit}
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default Payment;