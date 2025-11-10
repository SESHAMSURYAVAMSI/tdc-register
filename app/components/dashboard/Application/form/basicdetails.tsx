"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { basicDetailsSchema } from "@/lib/basicDetailsSchema";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";
import { register } from "module";

export type Step1FormValues = z.infer<typeof basicDetailsSchema>;

interface Props {
  onNext: (data: Step1FormValues) => void;
  defaultValues?: Partial<Step1FormValues>;
  onFileChange?: (name: string, file: File) => void;
}

export default function BasicDetails({
  onNext,
  defaultValues,
  onFileChange,
}: Props) {
  const methods = useForm<Step1FormValues>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: Step1FormValues) => {
    onNext(data);
  };

  // Add steps array (same as MultiStepForm for consistency)
  const steps = [
    { label: "Fill Basic Details" },
    { label: "Upload Details" },
    { label: "Review & Confirm" },
    { label: "Confirm & Pay" },
  ];

  return (
    <div>
      {/* <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-10"> */}
      {/* <FormStepper currentStep={1} steps={steps} /> */}
      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
          >
            {/* Upload Passport Size Photo */}
          <FormField
            name="passportPhoto"
            render={({ field }) => (
              <FormItem className="w-full md:col-span-2">
                <FormLabel>
                  Upload Passport Size Photo (JPEG/PNG/PDF)
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md file:rounded-r-md file:px-4 file:cursor-pointer file:text-center"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      if (file && onFileChange) onFileChange(field.name, file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            {/* Registration Category */}
            <FormField
              name="registrationCategory"
              render={({ field }) => (
                <FormItem className="w-full md:col-span-2">
                  <FormLabel>
                    Registration Category{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Registration Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Provisional Registration">
                        Provisional Registration
                      </SelectItem>
                      <SelectItem value="Bachelor of Dental Surgery (BDS) from Telangana">
                        Bachelor of Dental Surgery (BDS) from Telangana
                      </SelectItem>
                      <SelectItem value="Transfer BDS (BDS registrant - from other state dental councils in India)">
                        Transfer BDS (BDS registrant - from other state dental
                        councils in India)
                      </SelectItem>
                      <SelectItem value="Transfer BDS + New MDS">
                        Transfer BDS + New MDS
                      </SelectItem>
                      <SelectItem value="Transfer MDS (MDS registrant - from other state dental councils in India)">
                        Transfer MDS (MDS registrant - from other state dental
                        councils in India)
                      </SelectItem>
                      <SelectItem value="Master of Dental Surgery (MDS) from Telangana">
                        Master of Dental Surgery (MDS) from Telangana
                      </SelectItem>
                      <SelectItem value="Non Indian Dentist Registration (Temporary)">
                        Non Indian Dentist Registration (Temporary)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* first name */}
            <FormField
              name="fname"
              render={(field) => (
                <FormItem className="w-full">
                  <FormLabel>
                    First Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Enter your first name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* middle name */}
            <FormField
              name="mname"
              render={(field) => (
                <FormItem className="w-full">
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Enter your middle name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* last name */}
            <FormField
              name="lname"
              render={(field) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Last Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Enter your last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Gender <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Father's Name */}
            <FormField
              name="fatherName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Father's Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Father's Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* mother name */}
            <FormField
              name="mothername"
              render={(field) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Mother's Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter mother's name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Place */}
            <FormField
              name="place"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Place<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Place of birth"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Date & Year of Birth <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-between text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          {field.value
                            ? format(new Date(field.value), "dd/MM/yyyy")
                            : "Select date"}
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nationality */}
            <FormField
              name="nationality"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Nationality <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Natural born Indian Citizen">
                        Natural born Indian Citizen
                      </SelectItem>
                      <SelectItem value="Natural born British Subject">
                        Natural born British Subject
                      </SelectItem>
                      <SelectItem value="British Subject if Indian Domicile">
                        British Subject if Indian Domicile
                      </SelectItem>
                      <SelectItem value="Naturalized Indian Citizen">
                        Naturalized Indian Citizen
                      </SelectItem>
                      <SelectItem value="Subject of a Foreign Government">
                        Subject of a Foreign Government
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* category */}
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent >
                      <SelectItem value="Open Category">
                        Open Category
                      </SelectItem>
                      <SelectItem value="Backward Classes">
                        Backward Classes
                      </SelectItem>
                      <SelectItem value="Scheduled Castes">
                        Scheduled Castes
                      </SelectItem>
                      <SelectItem value="Scheduled Tribes">
                        Scheduled Tribes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="w-full"
                      placeholder="Enter email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      value={
                        field.value ??
                        // defaultValues?.email ??
                        "johndoe@example.com"
                      }
                      className="w-full bg-gray-100 cursor-not-allowed text-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Mobile */}
            <FormField
              name="mobile"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Mobile Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      className="w-full"
                      placeholder="Enter mobile number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="telephone_number"
              render={(field) => (
                <FormItem className="w-full">
                  <FormLabel>Telephone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter telephone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2 w-full">
                  <FormLabel>
                    Residential Address with Pincode{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PAN Number */}
            <FormField
              name="panNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    PAN Card Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={10}
                      inputMode="text"
                      placeholder="e.g. AAAAA1234A"
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload PAN */}
            <FormField
              name="panCard"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Upload PAN Card (PDF)
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md file:rounded-r-md file:px-4 file:cursor-pointer file:text-center"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                        if (file && onFileChange)
                          onFileChange(field.name, file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Aadhaar Number */}
            <FormField
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Aadhaar Card Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      inputMode="numeric"
                      maxLength={12}
                      pattern="\d*"
                      placeholder="xxxx xxxx xxxx"
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Aadhaar */}
            <FormField
              name="aadhaarCard"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Upload Aadhaar Card (PDF)
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md file:rounded-r-md file:px-4 file:cursor-pointer file:text-center"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                        if (file && onFileChange)
                          onFileChange(field.name, file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Registration Type */}
            <FormField
              name="registrationType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Registration Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Registration Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Regular (By Post - Fee includes postal charges)">
                        Regular (By Post - Fee includes postal charges)
                      </SelectItem>
                      <SelectItem value="Tatkal (By Hand)">
                        Tatkal (By Hand)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Signature */}
            <FormField
              name="signature"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Upload Signature (PDF){" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md file:rounded-r-md file:px-4 file:cursor-pointer file:text-center"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                        if (file && onFileChange)
                          onFileChange(field.name, file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-[#00694A] hover:bg-[#004d36] text-white"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
    // {/* // </div> */}
  );
}