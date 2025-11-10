import { z } from "zod";

export const nocFormSchema = z.object({
  dental_council_name: z
    .string()
    .min(1, { message: "Transferee State Dental Council Name is required" }),

  current_tdc_reg_certificate: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),

  aadhaar_upload: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),

  post_address: z
    .string()
    .min(1, { message: "Postal Address with Pincode is required" }),

  payment_id: z.string().min(1, { message: "Payment ID is required" }), // change to optional() if not mandatory
});

export type NocFormData = z.infer<typeof nocFormSchema>;
