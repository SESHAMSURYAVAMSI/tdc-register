"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { Step1FormValues } from "./basicdetails";
import type { Step2FormValues } from "./conditionalfields";

type FormData = Partial<Step1FormValues & Step2FormValues>;

interface FormReviewProps {
  data: FormData;
  onEdit?: (section: string) => void;
}

const fieldLabels: Record<keyof FormData, string> = {
  registrationCategory: "Registration Category",
  fullName: "Full Name",
  gender: "Gender",
  fatherName: "Father's Name",
  place: "Place of Birth",
  dateOfBirth: "Date of Birth",
  nationality: "Nationality",
  email: "Email",
  mobile: "Mobile Number",
  address: "Residential Address",
  panNumber: "PAN Card Number",
  panCard: "PAN Card (PDF)",
  aadhaarNumber: "Aadhaar Card Number",
  aadhaarCard: "Aadhaar Card (PDF)",
  registrationType: "Registration Type",
  signature: "Signature (PDF)",

  // Conditional
  pr_bds_upload: "Provisional BDS Certificate (PR)",
  pr_bonafide_upload: "Bonafide Certificate (PR)",
  ssc_memo: "SSC Marks Memo",
  custodian_clg: "College Custodian Certificate",
  professional_address: "Professional Address",
  qualification_description: "Qualification Description",
  bds_university_address: "University Address (BDS)",
  bds_qualification_year: "Qualification Month/Year (BDS)",
  bds_clg_address: "College Address (BDS)",
  bds_degree_upload: "Degree Certificate (BDS)",
  study_upload: "Study/Conduct/Attempt Certificate",
  intern_upload: "Internship Certificate",
  pr_certificate_upload: "TDC Provisional Registration Certificate",
  bds_affidavit_upload: "Affidavit (BDS)",
  mds_university_name: "University Address (MDS)",
  mds_qualification_date: "Qualification Month/Year (MDS)",
  mds_college_name: "College Address (MDS)",
  mds_degree_certificate: "Degree Certificate (MDS)",
  mds_college_bonafide: "Bonafide/Marks Memo (MDS)",
  tdc_registration_certificate: "TDC Registration Certificate (MDS)",
  noc_dci: "NOC from DCI",
  noc_transferor_state: "NOC from Transferor State Council",
  mds_affidavit: "Affidavit (MDS)",
};

const groupOrder: Record<string, (keyof FormData)[]> = {
  "Basic Details": [
    "registrationCategory",
    "fullName",
    "gender",
    "fatherName",
    "place",
    "dateOfBirth",
    "nationality",
    "email",
    "mobile",
    "address",
    "panNumber",
    "aadhaarNumber",
    "registrationType",
  ],
  Uploads: [
    "panCard",
    "aadhaarCard",
    "signature",
    "pr_bds_upload",
    "pr_bonafide_upload",
    "ssc_memo",
    "custodian_clg",
    "bds_degree_upload",
    "study_upload",
    "intern_upload",
    "pr_certificate_upload",
    "bds_affidavit_upload",
    "mds_degree_certificate",
    "mds_college_bonafide",
    "tdc_registration_certificate",
    "noc_dci",
    "noc_transferor_state",
    "mds_affidavit",
  ],
  "BDS Details": [
    "professional_address",
    "qualification_description",
    "bds_university_address",
    "bds_qualification_year",
    "bds_clg_address",
  ],
  "MDS Details": [
    "mds_university_name",
    "mds_qualification_date",
    "mds_college_name",
  ],
};

const isFile = (val: unknown): val is File =>
  typeof val === "object" && val !== null && val instanceof File;

const FormReview: React.FC<FormReviewProps> = ({ data, onEdit }) => {
  const renderValue = (key: keyof FormData, value: unknown) => {
    if (isFile(value)) {
      const url = URL.createObjectURL(value);
      return (
        <a
          href={url}
          download={value.name}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 underline"
        >
          <FileText className="h-4 w-4 text-red-600" />
          <span>
            {value.name} ({(value.size / 1024).toFixed(1)} KB)
          </span>
        </a>
      );
    }

    if (
      typeof value === "string" &&
      typeof key === "string" &&
      key.toLowerCase().includes("date")
    ) {
      const date = new Date(value);
      return date.toLocaleDateString("en-IN");
    }

    return <span>{value as string}</span>;
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupOrder).map(([groupName, keys]) => {
        const hasAny = keys.some((key) => typeof key === "string" && data[key]);
        if (!hasAny) return null;

        // Show Edit button only for Basic Details and MDS/BDS Details
        const canEdit =
          groupName === "Basic Details" ||
          groupName === "BDS Details" ||
          groupName === "MDS Details";

        return (
          <div key={groupName} className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {groupName}
              </h3>
              {onEdit && canEdit && (
                <Button
                  variant="outline"
                  onClick={() => onEdit(groupName)}
                  className="text-sm px-3 py-1 bg-[#00694A] hover:bg-[#004d36] text-white"
                >
                  Edit
                </Button>
              )}
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm bg-white p-6 rounded shadow-sm border border-gray-200">
              {keys.map((key) => {
                if (typeof key !== "string") return null;
                const value = data[key];
                if (!value) return null;

                return (
                  <div key={key}>
                    <dt className="font-medium text-gray-600">
                      {fieldLabels[key] || key}
                    </dt>
                    <dd className="text-gray-800">{renderValue(key, value)}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        );
      })}
    </div>
  );
};

export default FormReview;