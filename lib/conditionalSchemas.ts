// lib/conditionalSchemas.ts
import * as z from 'zod';

// Reusable PDF validation
const pdfFileSchema = z
  .instanceof(File)
  .refine((file) => file.type === 'application/pdf', {
    message: 'Only PDF files are allowed.',
  });

  const monthYearSchema = z
  .string()
  .min(1, "Month & Year is required")
  .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Format must be MM/YYYY with valid month")
  .refine((val) => {
    const [month, year] = val.split('/').map(Number);
    if (!month || !year) return false;

    const entered = new Date(year, month - 1);
    const now = new Date();
    now.setDate(1); // compare month/year only

    return entered <= now;
  }, {
    message: "Date must not be in the future",
  });


// Schema Definitions
export const conditionalSchemas = {
  "Provisional Registration": z.object({
    pr_bds_upload: pdfFileSchema,
    pr_bonafide_upload: pdfFileSchema,
    ssc_memo: pdfFileSchema,
    custodian_clg: pdfFileSchema,
  }),

  "Bachelor of Dental Surgery (BDS) from Telangana": z.object({
    professional_address: z.string().min(1, "Required"),
    qualification_description: z.string().min(1, "Required"),
    bds_university_address: z.string().min(1, "Required"),
    bds_qualification_year: monthYearSchema,
    bds_clg_address: z.string().min(1, "Required"),
    bds_degree_upload: pdfFileSchema,
    study_upload: pdfFileSchema,
    intern_upload: pdfFileSchema,
    pr_certificate_upload: pdfFileSchema,
    bds_affidavit_upload: pdfFileSchema,
    ssc_memo: pdfFileSchema,
    custodian_clg: pdfFileSchema,
  }),

  "Transfer BDS (BDS registrant - from other state dental councils in India)":
    z.object({
      professional_address: z.string().min(1),
      qualification_description: z.string().min(1),
      bds_university_address: z.string().min(1),
      bds_qualification_year: monthYearSchema,
      bds_clg_address: z.string().min(1),
      bds_degree_upload: pdfFileSchema,
      study_upload: pdfFileSchema,
      intern_upload: pdfFileSchema,
      pr_certificate_upload: pdfFileSchema,
      bds_affidavit_upload: pdfFileSchema,
      ssc_memo: pdfFileSchema,
      custodian_clg: pdfFileSchema,
    }),

  "Transfer BDS + New MDS": z.object({
    professional_address: z.string().min(1),
    qualification_description: z.string().min(1),
    bds_university_address: z.string().min(1),
    bds_qualification_year: monthYearSchema,
    bds_clg_address: z.string().min(1),
    bds_degree_upload: pdfFileSchema,
    study_upload: pdfFileSchema,
    intern_upload: pdfFileSchema,
    pr_certificate_upload: pdfFileSchema,
    bds_affidavit_upload: pdfFileSchema,
    ssc_memo: pdfFileSchema,
    custodian_clg: pdfFileSchema,
    mds_university_name: z.string().min(1),
    mds_qualification_date: monthYearSchema,
    mds_college_name: z.string().min(1),
    mds_degree_certificate: pdfFileSchema,
    mds_college_bonafide: pdfFileSchema,
    tdc_registration_certificate: pdfFileSchema,
    noc_dci: pdfFileSchema,
    noc_transferor_state: pdfFileSchema,
    mds_affidavit: pdfFileSchema,
    pg_speciality: z.string().min(1, "Please select a PG/MDS speciality"),
  }),

  "Transfer MDS (MDS registrant - from other state dental councils in India)":
    z.object({
      professional_address: z.string().min(1),
      qualification_description: z.string().min(1),
      bds_university_address: z.string().min(1),
      bds_qualification_year: monthYearSchema,
      bds_clg_address: z.string().min(1),
      bds_degree_upload: pdfFileSchema,
      study_upload: pdfFileSchema,
      intern_upload: pdfFileSchema,
      pr_certificate_upload: pdfFileSchema,
      bds_affidavit_upload: pdfFileSchema,
      ssc_memo: pdfFileSchema,
      custodian_clg: pdfFileSchema,
      mds_university_name: z.string().min(1),
      mds_qualification_date: monthYearSchema,
      mds_college_name: z.string().min(1),
      mds_degree_certificate: pdfFileSchema,
      mds_college_bonafide: pdfFileSchema,
      noc_dci: pdfFileSchema,
      noc_transferor_state: pdfFileSchema,
      pg_speciality: z.string().min(1, "Please select a PG/MDS speciality"),
    }),

  "Master of Dental Surgery (MDS) from Telangana": z.object({
    mds_university_name: z.string().min(1),
    mds_qualification_date: monthYearSchema,
    mds_college_name: z.string().min(1),
    mds_degree_certificate: pdfFileSchema,
    mds_college_bonafide: pdfFileSchema,
    mds_affidavit: pdfFileSchema,
    pg_speciality: z.string().min(1, "Please select a PG/MDS speciality"),
  }),

  "Non Indian Dentist Registration (Temporary)": z.object({
    professional_address: z.string().min(1),
    qualification_description: z.string().min(1),
    bds_university_address: z.string().min(1),
    bds_qualification_year: monthYearSchema,
    bds_clg_address: z.string().min(1),
    bds_degree_upload: pdfFileSchema,
    study_upload: pdfFileSchema,
    intern_upload: pdfFileSchema,
    pr_certificate_upload: pdfFileSchema,
    bds_affidavit_upload: pdfFileSchema,
    ssc_memo: pdfFileSchema,
    custodian_clg: pdfFileSchema,
  }),
} satisfies Record<string, z.ZodObject<any>>;

// Get schema by category
export const getConditionalSchema = (
  category: keyof typeof conditionalSchemas
): z.ZodObject<any> => {
  return conditionalSchemas[category] ?? z.object({});
};

// Inferred type from selected schema
export type Step2FormValues = z.infer<ReturnType<typeof getConditionalSchema>>;
