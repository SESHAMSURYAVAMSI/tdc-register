'use client';

import { useState } from 'react';

interface StepperProps {
  currentStep: number;
  steps: {
    label: string;
    subLabel?: string;
  }[];
}

export default function FormStepper({ currentStep, steps }: StepperProps) {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePaymentSubmit = () => {
    // ...your payment logic...
    setPaymentComplete(true);
  };

  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto mb-10 px-4">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white z-10 text-sm font-semibold ${
                isActive || isCompleted ? 'bg-[#00694A]' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <div className="text-center mt-2 text-sm">
              <span className={`block ${isActive ? 'text-[#00694A] font-semibold' : 'text-gray-700'}`}>
                {step.label}
              </span>
              {step.subLabel && (
                <span className="block text-xs text-gray-500">{step.subLabel}</span>
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-1">
                <div
                  className={`border-t-1 w-full translate-x-4 ${
                    isCompleted ? 'border-[#00694A]' : 'border-gray-300'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}