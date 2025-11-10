import { z } from "zod"

export const gscFormSchema = z.object({
  tdc_reg_certificate: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),

  testimonial_dental1: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),

  testimonial_dental2: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),

  gsc_aadhaar_upload: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),

  post_address: z
    .string()
    .min(1, { message: "Postal Address is required" }),

  tdc_reg_dental1: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),

  tdc_reg_dental2: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Only PDF files allowed",
    }),
})

// Inferred TypeScript type for use in form
export type GscFormData = z.infer<typeof gscFormSchema>
