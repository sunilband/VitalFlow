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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

import {
  getAllStates,
  getCities,
} from "@/lib/apiCalls/donor/getAllStatesAndCities";
import { sendPhoneOtp, sendEmailOtp } from "@/lib/apiCalls/donor/otpCalls";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { BsCalendar2Date } from "react-icons/bs";
import { sendResisterEmailOtp } from "@/lib/apiCalls/bloodbank/sendResisterEmailOtp";

type Props = {};

const BloodBankSignupForm = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const initialValues = {
    name: "",
    parentHospitalName: "",
    category: "",
    contactPersonName: "",
    contactPersonPhone: "",
    email: "",
    password: "",
    // confirmPassword: "",
    license: "",
    licenseValidity: "",
    website: "",
    componentFacility: false,
    apheresisFacility: false,
    helplineNumber: "",
    remarks: "",
    address: {
      addressType: "Bloodbank",
      state: "",
      city: "",
      pincode: "",
      addressLine1: "",
      addressLine2: "",
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      category: Yup.string().required("Category is required"),
      contactPersonName: Yup.string().required(
        "Contact Person Name is required",
      ),
      contactPersonPhone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid phone number (do not add +91 or 0)")
        .required("Contact Person Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      license: Yup.string().required("License is required"),
      licenseValidity: Yup.date().required("License Validity is required"),
      componentFacility: Yup.boolean(),
      apheresisFacility: Yup.boolean(),
      address: Yup.object({
        addressType: Yup.string().required("Address type is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        pincode: Yup.string().required("Pincode is required"),
        addressLine1: Yup.string().required("Address line 1 is required"),
        addressLine2: Yup.string().required("Address line 2 is required"),
      }),
      website: Yup.string().url("Invalid website URL"),
      helplineNumber: Yup.string().matches(
        /^[6-9]\d{9}$/,
        "Invalid phone number",
      ),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&), and be at least 8 characters long.",
        ),
      // confirmPassword: Yup.string()
      //   .required("Confirm Password is required")
      //   .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values) => {},
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = Object.keys(formik.errors);
    const errorValues = Object.values(formik.errors);
    if (formik.errors) {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i] !== "address") {
          toast.error(String(errorValues[i])); // Convert errorValues[i] to a string
          return;
        }
        if (errors[i] === "address") {
          return toast.error("address is not filled"); // Convert errorValues[i] to a string
        }
      }
    }
    if (errors.length > 0) {
      return;
    }
    setIsLoading(true);

    try {
      sendResisterEmailOtp(formik.values.email)
        .then((data) => {
          if (!data.success) {
            toast.error(data.message);
            setIsLoading(false);
            return;
          }
          if (data.success) {
            toast.success(data.message);
          }
        })
        .then(() => {
          const secretInputs = jwt.sign(formik.values, "secret");
          router.push(`/bloodbank/signup/verify?values=${secretInputs}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //City and State
  const [allStates, setAllStates] = React.useState<any[]>([]);
  const [allCities, setAllCities] = React.useState<any[]>([]);
  React.useEffect(() => {
    getAllStates().then((data) => {
      setAllStates(data);
    });
  }, []);

  React.useEffect(() => {
    formik.setFieldValue("address.city", "");
    const selectedState = allStates?.find(
      (state) => state.name === formik.values.address.state,
    );

    if (selectedState) {
      getCities(selectedState?.iso2 || "MH").then((data) => {
        setAllCities(data);
      });
    }
  }, [formik.values.address.state]);

  const fillSampleData = () => {
    formik.setValues({
      name: "Blood Bank",
      parentHospitalName: "Hospital",
      category: "Government",
      contactPersonName: "John Doe",
      contactPersonPhone: "9876543210",
      email: "sunil.band.cs@ghrcem.raiosni.net",
      password: "Sunil@123",
      license: "123456",
      licenseValidity: new Date().toISOString(),
      website: "https://bloodbank.com",
      componentFacility: true,
      apheresisFacility: false,
      helplineNumber: "9876543210",
      remarks: "Remarks",
      address: {
        addressType: "Bloodbank",
        state: "Maharashtra",
        city: "Akola",
        pincode: "444001",
        addressLine1: "Address Line 1",
        addressLine2: "Address Line 2",
      },
    });
  };

  return (
    <Card className="mx-auto drop-shadow-2xl mt-28 sm:mt-0">
      <CardHeader>
        <CardTitle className="text-xl">Blood Bank Signup</CardTitle>
        <CardDescription>
          Register your blood bank to help save lives{" "}
          <button
            className="border px-2 bg-red-900 text-white"
            onClick={fillSampleData}
          >
            Set sample values (for testing)
          </button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* section div */}
        <form onSubmit={onSubmit}>
          <div className="flex gap-5 flex-wrap items-center justify-center">
            {/* Left side */}
            <div className="flex flex-col gap-2">
              <div>
                <Input
                  id="name"
                  placeholder="Bloodbank Name"
                  {...formik.getFieldProps("name")}
                />
              </div>

              <div>
                <Select
                  {...formik.getFieldProps("category")}
                  //  value={formik.values.gender}
                  //  onValueChange={(e) => formik.setFieldValue("gender", e)}
                  value={formik.values.category}
                  onValueChange={(e) => formik.setFieldValue("category", e)}
                >
                  <SelectTrigger className="w-full text-[#71717A]">
                    <SelectValue placeholder={`Category`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="RedCross">RedCross</SelectItem>
                      <SelectItem value="Charitable/Vol">
                        Charitable/Vol
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Input
                  id="contactPersonName"
                  placeholder="Contact Person Name"
                  {...formik.getFieldProps("contactPersonName")}
                />
                <Input
                  id="contactPersonPhone"
                  placeholder="Contact Person Phone"
                  {...formik.getFieldProps("contactPersonPhone")}
                />
              </div>

              <div>
                <Input
                  id="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
              </div>

              <div className="flex gap-2">
                <Input
                  id="license"
                  placeholder="License"
                  {...formik.getFieldProps("license")}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.licenseValidity &&
                          "text-muted-foreground",
                      )}
                    >
                      {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                      <BsCalendar2Date className="mr-2" />
                      {formik.values.licenseValidity ? (
                        format(formik.values.licenseValidity, "PPP")
                      ) : (
                        <span>License Validity</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      fromDate={new Date()}
                      selected={new Date(formik.values.licenseValidity)}
                      onSelect={(date) =>
                        formik.setFieldValue("licenseValidity", date)
                      } // update the date when it is changed
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Input
                  id="website"
                  placeholder="Website"
                  {...formik.getFieldProps("website")}
                />
              </div>

              <div>
                <Input
                  id="helplineNumber"
                  placeholder="Helpline Number"
                  {...formik.getFieldProps("helplineNumber")}
                />
              </div>

              <div>
                <Input
                  id="remarks"
                  placeholder="Remarks"
                  {...formik.getFieldProps("remarks")}
                />
              </div>
            </div>
            {/* cretate a vertical line */}
            <hr className="border-r md:block hidden border-[#E5E5E5] h-64" />

            {/* Right side */}
            <div className="flex flex-col justify-between h-[22rem] w-full sm:w-auto">
              <div className="grid gap-2">
                {/* facilities */}
                <Label className="px-2">Facilities</Label>
                <div className="flex flex-col px-2 rounded py-2 gap-2">
                  <div className="flex gap-2">
                    <Checkbox
                      id="componentFacility"
                      checked={formik.values.componentFacility}
                      onCheckedChange={(checked) => {
                        formik.setFieldValue("componentFacility", checked);
                      }}
                    />
                    <label
                      htmlFor="componentFacility"
                      className="text-sm text-[#71717A] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Component Facility
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Checkbox
                      id="apheresisFacility"
                      checked={formik.values.apheresisFacility}
                      onCheckedChange={(checked) => {
                        formik.setFieldValue("apheresisFacility", checked);
                      }}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-[#71717A] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Apheresis Facility
                    </label>
                  </div>
                </div>

                <Label className="px-2">Address</Label>
                <section className="flex gap-1">
                  <div className="flex flex-col w-full">
                    <Select
                      value={formik.values.address.state}
                      onValueChange={(e) =>
                        formik.setFieldValue("address.state", e)
                      }
                    >
                      <SelectTrigger className="w-full text-[#71717A]">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>State</SelectLabel>
                          {allStates?.map((state, key) => (
                            <SelectItem key={key} value={state.name}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full">
                    <Select
                      value={formik.values.address.city}
                      onValueChange={(e) =>
                        formik.setFieldValue("address.city", e)
                      }
                      disabled={!formik.values.address.state}
                    >
                      <SelectTrigger className="w-full text-[#71717A]">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Cities</SelectLabel>
                          {allCities?.map((city, key) => (
                            <SelectItem key={key} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </section>

                <div className="flex flex-col">
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="Pincode"
                    {...formik.getFieldProps("address.pincode")}
                  />
                  {formik.touched.address?.pincode &&
                  formik.errors.address?.pincode ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.address?.pincode}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <Input
                      id="addressLine1"
                      type="text"
                      placeholder="Address Line 1"
                      {...formik.getFieldProps("address.addressLine1")}
                    />
                    {formik.touched.address?.addressLine1 &&
                    formik.errors.address?.addressLine1 ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.address?.addressLine1}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      id="addressLine2"
                      type="text"
                      placeholder="Address Line 2"
                      {...formik.getFieldProps("address.addressLine2")}
                    />
                    {formik.touched.address?.addressLine2 &&
                    formik.errors.address?.addressLine2 ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.address?.addressLine2}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm flex flex-col gap-2 ">
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
            Already have an account?{" "}
            <Link href="#" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BloodBankSignupForm;
