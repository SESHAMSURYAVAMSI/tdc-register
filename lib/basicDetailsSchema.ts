import * as z from "zod";

export const basicDetailsSchema = z.object({
  // fname: z
  //   .string()
  //   .min(1, "First name is required")
  //   .regex(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  // mname: z
  //   .string()
  //   .regex(/^[a-zA-Z\s]*$/, "Only alphabets are allowed")
  //   .optional(),

  // lname: z
  //   .string()
  //   .min(1, "Last name is required")
  //   .regex(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  // gender: z.enum(["Male", "Female", "Other"], {
  //   required_error: "Gender is required",
  // }),

  // fatherName: z
  //   .string()
  //   .min(1, "Father's Name is required")
  //   .regex(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  // mothername: z
  //   .string()
  //   .min(1, "Mother's Name is required")
  //   .regex(/^[a-zA-Z\s]*$/, "Only alphabets are allowed"),

  // dateOfBirth: z.string().min(1, "Date of Birth is required"), // Format validation (e.g. YYYY-MM-DD) can be added later

  // email: z.string().email("Invalid email format"),

  // mobile: z
  //   .string()
  //   .min(10, "Mobile number must be 10 digits")
  //   .max(10, "Mobile number must be 10 digits")
  //   .regex(/^[0-9]+$/, "Only numbers are allowed"),

  // telephone_number: z
  //   .string()
  //   .regex(/^[0-9]*$/, "Only numbers are allowed")
  //   .optional(),

  // address: z.string().min(1, "Residential address is required"),

  // place: z.string().min(1, "Place is required"),

  // panNumber: z
  //   .string()
  //   .min(1, "PAN number is required")
  //   .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
  //     message: "Invalid PAN number (e.g. AAAAA1234A)",
  //   }),

  // aadhaarNumber: z
  //   .string()
  //   .min(1, "Aadhaar number is required")
  //   .regex(/^\d{12}$/, "Aadhaar must be 12 digits"),

  // // PAN Card Upload
  // panCard: z.custom<File>(
  //   (file) =>
  //     file instanceof File &&
  //     file.type === "application/pdf" &&
  //     file.size <= 5 * 1024 * 1024, // Max 5MB
  //   {
  //     message: "PAN Card PDF is required, must be a PDF, and less than 5MB",
  //   }
  // ),

  // // Aadhaar Card Upload
  // aadhaarCard: z.custom<File>(
  //   (file) =>
  //     file instanceof File &&
  //     file.type === "application/pdf" &&
  //     file.size <= 5 * 1024 * 1024, // Max 5MB
  //   {
  //     message: "Aadhaar Card PDF is required, must be a PDF, and less than 5MB",
  //   }
  // ),

  // // Signature Upload
  // signature: z.custom<File>(
  //   (file) =>
  //     file instanceof File &&
  //     file.type === "application/pdf" &&
  //     file.size <= 5 * 1024 * 1024, // Max 5MB
  //   {
  //     message: "Signature PDF is required, must be a PDF, and less than 5MB",
  //   }
  // ),

  nationality: z.enum(
    [
      "Natural born Indian Citizen",
      "Natural born British Subject",
      "British Subject if Indian Domicile",
      "Naturalized Indian Citizen",
      "Subject of a Foreign Government",
    ],
    { required_error: "Nationality is required" }
  ),

  category: z.enum(
    [
      "Open Category",
      "Backward Classes",
      "Scheduled Castes",
      "Scheduled Tribes",
    ],
    { required_error: "Category is required" }
  ),
  passportPhoto: z
  .instanceof(File, { message: "Passport size photo is required" })
  .refine((file) => file.size > 0, "Passport size photo is required"),


  registrationCategory: z.enum(
    [
      "Provisional Registration",
      "Bachelor of Dental Surgery (BDS) from Telangana",
      "Transfer BDS (BDS registrant - from other state dental councils in India)",
      "Transfer BDS + New MDS",
      "Transfer MDS (MDS registrant - from other state dental councils in India)",
      "Master of Dental Surgery (MDS) from Telangana",
      "Non Indian Dentist Registration (Temporary)",
    ],
    {
      required_error: "Registration Category is required",
    }
  ),

  registrationType: z.enum(
    ["Regular (By Post - Fee includes postal charges)", "Tatkal (By Hand)"],
    {
      required_error: "Registration Type is required",
    }
  ),
});
