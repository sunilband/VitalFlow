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
import {
  getAllStates,
  getCities,
} from "@/lib/apiCalls/signup/getAllStatesAndCities";
import { sendPhoneOtp, sendEmailOtp } from "@/lib/apiCalls/signup/otpCalls";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

type Props = {};

const DonorSignup = (props: Props) => {
  const router = useRouter();
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
        city: Yup.string().required("City is required"),
        pincode: Yup.string().required("Pincode is required"),
        addressLine1: Yup.string().required("Address line 1 is required"),
        addressLine2: Yup.string().required("Address line 2 is required"),
      }),
    }),
    onSubmit: (values) => {},
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = Object.keys(formik.errors);
    const errorValues = Object.values(formik.errors);
    console.log("formik.errors", formik.errors);
    console.log("values", formik.values);
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
    setIsLoading(true);

    const secretInputs = await jwt.sign(formik.values, "secret");

    try {
      if (formik.errors)
        if (formik.values.phone) {
          const response = await sendPhoneOtp({ phone: formik.values.phone });
          if (response.success) {
            toast.success(response.message);
            router.push(`/donor/signup/verify?values=${secretInputs}`);
          } else {
            toast.error(response.message);
          }
        }

      if (formik.values.email) {
        const response = await sendEmailOtp({ email: formik.values.email });
        if (response.success) {
          toast.success(response.message);
          router.push(`/donor/signup/verify?values=${secretInputs}`);
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error(error);
    }

    console.log(formik.values);
  };

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
    console.log("selectedState", selectedState);
    if (selectedState) {
      getCities(selectedState?.iso2 || "MH").then((data) => {
        setAllCities(data);
      });
    }
  }, [formik.values.address.state]);

  return (
    <div className="flex justify-center items-center h-calculated">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", damping: 10 }}
        className={cn(
          "grid gap-6 p-4 rounded-md shadow-xl bg-white dark:bg-[#09090B]",
        )}
        {...props}
      >
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="w-80 flex flex-col gap-2">
              <h2 className="text-center text-lg font-semibold tracking-widest">
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
                  <SelectTrigger className="w-full text-[#71717A]">
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
                  <SelectTrigger className="w-full text-[#71717A]">
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

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-start flex"
                    >
                      <p className="w-full -ml-2 text-[#71717A] font-normal">
                        Address
                      </p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Address</h4>
                        <p className="text-sm text-muted-foreground">
                          Please Fill The address below
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex flex-col">
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
                                {allStates?.map((state) => (
                                  <SelectItem key={state.id} value={state.name}>
                                    {state.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
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
                                {allCities?.map((city) => (
                                  <SelectItem key={city.id} value={city.name}>
                                    {city.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
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
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
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
      </motion.div>
    </div>
  );
};

export default DonorSignup;
