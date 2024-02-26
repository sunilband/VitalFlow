"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import spinner from "../../../../public/svgs/spinner.svg";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

type Props = {};

const DonorLogin = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const initialValues = {
    fullName: "",
    dob: "",
    weight: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: {
      addressType: "Donor",
      state: "",
      district: "",
      city: "",
      pincode: "",
      addressLine1: "",
      addressLine2: "",
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      dob: Yup.string().required("Date of birth is required"),
      weight: Yup.string().required("Weight is required"),
      gender: Yup.string()
        .oneOf(["Male", "Female", "Other"], "Invalid gender")
        .required("Gender is required"),
      bloodGroup: Yup.string()
        .oneOf(
          ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          "Invalid blood group",
        )
        .required("Blood group is required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number is not valid"),
      email: Yup.string().email("Invalid email address"),
      address: Yup.object({
        addressType: Yup.string().required("Address type is required"),
        state: Yup.string().required("State is required"),
        district: Yup.string().required("District is required"),
        city: Yup.string().required("City is required"),
        pincode: Yup.string().required("Pincode is required"),
        addressLine1: Yup.string().required("Address line 1 is required"),
        addressLine2: Yup.string().required("Address line 2 is required"),
      }),
    }),
    onSubmit: (values) => {},
  });
  console.log(formik.values);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formik.values);
  };

  return (
    <div className="flex justify-center items-center h-calculated">
      <div className={cn("grid gap-6 p-4 border rounded-md")} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="w-80 flex flex-col gap-2">
              <h2 className="text-center font-semibold tracking-wide">
                SIGNUP
              </h2>
              <div>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  {...formik.getFieldProps("fullName")}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.fullName}
                  </div>
                ) : null}
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.dob && "text-muted-foreground",
                      )}
                    >
                      {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                      {formik.values.dob ? (
                        format(formik.values.dob, "PPP")
                      ) : (
                        <span>Date Of Birth</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      toYear={parseInt(format(new Date(), "yyyy")) - 18}
                      selected={new Date(formik.values.dob)}
                      onSelect={(date) => formik.setFieldValue("dob", date)} // update the date when it is changed
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formik.touched.dob && formik.errors.dob ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.dob}
                  </div>
                ) : null}
              </div>

              <div>
                <Input
                  id="weight"
                  type="text"
                  placeholder="Weight"
                  {...formik.getFieldProps("weight")}
                />
                {formik.touched.weight && formik.errors.weight ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.weight}
                  </div>
                ) : null}
              </div>

              <div>
                <Select
                  value={formik.values.gender}
                  onValueChange={(e) => formik.setFieldValue("gender", e)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={formik.values.bloodGroup}
                  onValueChange={(e) => formik.setFieldValue("bloodGroup", e)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Blood Group</SelectLabel>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  required
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>

              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Image
                  src={spinner}
                  alt="spinner"
                  width={20}
                  height={20}
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              Sign Up
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Already have an account ?
            </span>
          </div>
        </div>
        <Button variant="secondary" type="button" disabled={isLoading}>
          <Link href="/donor/login">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default DonorLogin;
