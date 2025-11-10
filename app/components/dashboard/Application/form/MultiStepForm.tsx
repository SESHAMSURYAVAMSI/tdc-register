"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import BasicDetails from "./basicdetails";
import ConditionalFields from "./conditionalfields";
import FormReview from "./formreview";
import Payment from "./payment";
import FormStepper from "./formstepper";

import type { Step1FormValues } from "./basicdetails";
import type { Step2FormValues } from "./conditionalfields";
import { Button } from "@/components/ui/button";

type FormData = Step1FormValues & Partial<Step2FormValues>;

interface MultiStepFormProps {
  onClose?: () => void; // ✅ Optional prop to close sheet
}

export default function MultiStepForm({ onClose }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [paymentComplete, setPaymentComplete] = useState(false);
  const methods = useForm();

  const goNext = (data?: Partial<FormData>) => {
    if (data) setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => prev - 1);

  const handlePaymentSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPaymentComplete(true);
    if (onClose) setTimeout(() => onClose(), 1000); // Optional: Delay sheet close
  };

  const handleFileChange = (field: string, file: File) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleStep1 = (data: Step1FormValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2 = (data: Partial<Step2FormValues>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const steps = [
    { label: "Fill Basic Details" },
    { label: "Upload Details" },
    { label: "Review & Confirm" },
    { label: "Confirm & Pay" },
  ];

  const transitionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 pb-2 text-center">
        Application Form
      </h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={step + (paymentComplete ? "-done" : "")}
          variants={transitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35 }}
        >
          <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-3 sm:p-6 md:p-10 border border-gray-200">
            {!(step === 4 && paymentComplete) && (
              <FormStepper currentStep={step} steps={steps} />
            )}

            {step === 1 && (
              <BasicDetails
                onNext={handleStep1}
                defaultValues={formData as Step1FormValues}
                onFileChange={handleFileChange}
              />
            )}

            {step === 2 && (
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleStep2)}>
                  <ConditionalFields
                    registrationCategory={formData.registrationCategory ?? ""}
                    onFileChange={handleFileChange}
                    onNext={goNext}
                    onBack={goBack}
                    defaultValues={formData as Step2FormValues}
                  />
                  <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 pt-6">
                    <Button
                      type="button"
                      onClick={goBack}
                      className="bg-[#8B0000] hover:bg-[#6b0000] text-white"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#00694A] hover:bg-[#004d36] text-white"
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </FormProvider>
            )}

            {step === 3 && (
              <>
                <FormReview data={formData} />
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                  <Button
                    type="button"
                    onClick={goBack}
                    className="bg-[#8B0000] hover:bg-[#6b0000] text-white"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={goNext}
                    className="bg-[#00694A] hover:bg-[#004d36] text-white"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
              <FormProvider {...methods}>
                {!paymentComplete ? (
                  <form onSubmit={handlePaymentSubmit}>
                    <Payment onSubmit={handlePaymentSubmit} />
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                    <h2 className="text-2xl font-semibold text-[#00694A] mb-4">
                      Thank You!
                    </h2>
                    <p className="text-gray-700 text-lg mb-2">
                      Your payment was successful.
                    </p>
                    <p className="text-gray-600">
                      We have received your application and payment.
                      <br />
                      You will receive a confirmation email shortly.
                    </p>
                  </div>
                )}
              </FormProvider>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
