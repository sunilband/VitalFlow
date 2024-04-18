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

type Props = {};

const CampSignupForm = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const initialValues = {
    organizationName: "",
    organizationType: "",
    organizerName: "",
    organizerMobileNumber: "",
    organizerEmail: "",
    coOrganizerName: "",
    coOrganizerMobileNumber: "",
    campName: "",
    address: {
      // Address fields
      addressType: "",
      state: "",
      city: "",
      pincode: "",
      addressLine1: "",
      addressLine2: "",
    },
    campDate: "",
    campStartTime: "",
    campEndTime: "",
    estimatedParticipants: "",
    supporter: "",
    remarks: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      organizationName: Yup.string().required("Organization Name is required"),
      organizationType: Yup.string().required("Organization Type is required"),
      organizerName: Yup.string().required("Organizer Name is required"),
      organizerMobileNumber: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid phone number")
        .required("Organizer Mobile Number is required"),
      organizerEmail: Yup.string()
        .email("Invalid email")
        .required("Organizer Email is required"),
      campStartTime: Yup.string().required("Camp Start Time is required"),
      campEndTime: Yup.string()
        .required("Camp End Time is required")
        .test(
          "is-greater",
          "end time must be later than start time",
          function (value) {
            const { campStartTime } = this.parent;
            return value > campStartTime;
          },
        ),
      address: Yup.object({
        addressType: Yup.string().required("Address type is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        pincode: Yup.string().required("Pincode is required"),
        addressLine1: Yup.string().required("Address line 1 is required"),
        addressLine2: Yup.string().required("Address line 2 is required"),
      }),
      // Other fields validation goes here
      // Define validations for each field according to the schema
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

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

    console.log(formik.values);

    try {
      const secretInputs = jwt.sign(formik.values, "secret");
      router.push(`/camp/signup/select-blood-bank?values=${secretInputs}`);
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------- Sample data ----------------------
  const fillSampleData = () => {
    formik.setValues({
      organizationName: "Organization Name",
      organizationType: "Sewa hi Sangathan - Health Volunteers",
      organizerName: "Organizer Name",
      organizerMobileNumber: "9876543210",
      organizerEmail: "dummy@gmail.com",
      coOrganizerName: "Co-Organizer Name",
      coOrganizerMobileNumber: "9876543210",
      campName: "Camp Name",
      address: {
        addressType: "Home",
        state: "Maharashtra",
        city: "Mumbai",
        pincode: "400001",
        addressLine1: "Address Line 1",
        addressLine2: "Address Line 2",
      },
      campDate: new Date().toISOString(),
      campStartTime: "10:00",
      campEndTime: "18:00",
      estimatedParticipants: "100",
      supporter: "Supporter",
      remarks: "Remarks",
      password: "Dummy@123",
    });
  };

  return (
    <Card className="mx-auto drop-shadow-2xl mt-28 sm:mt-0">
      <CardHeader>
        <CardTitle className="text-xl">Donation Camp Signup</CardTitle>
        <CardDescription>
          Register your camp for registered bloodbanks to help save lives{" "}
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
              <Label className="ml-2">Organizatioin details</Label>
              <div className="flex gap-2">
                <Input
                  id="organizationName"
                  placeholder="Organization Name"
                  {...formik.getFieldProps("organizationName")}
                />

                <Select
                  {...formik.getFieldProps("organizationType")}
                  value={formik.values.organizationType}
                  onValueChange={(e) =>
                    formik.setFieldValue("organizationType", e)
                  }
                >
                  <SelectTrigger className="w-full text-[#71717A]">
                    <SelectValue placeholder={`Organization Type`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Organization Type</SelectLabel>
                      <SelectItem value="Sewa hi Sangathan - Health Volunteers">
                        Sewa hi Sangathan - Health Volunteers
                      </SelectItem>
                      <SelectItem value="Terapanth Yuvak Parishad">
                        Terapanth Yuvak Parishad
                      </SelectItem>
                      <SelectItem value="RedCross">RedCross</SelectItem>
                      <SelectItem value="RWA">RWA</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  id="campName"
                  placeholder="Camp Name"
                  {...formik.getFieldProps("campName")}
                />
              </div>

              <Label className="ml-2">Organizer details</Label>
              <div className="flex gap-2">
                <Input
                  id="organizerName"
                  placeholder="Name"
                  {...formik.getFieldProps("organizerName")}
                />
                <Input
                  id="organizerMobileNumber"
                  placeholder="Mobile Number"
                  {...formik.getFieldProps("organizerMobileNumber")}
                />
              </div>

              <div>
                <Input
                  id="organizerEmail"
                  placeholder="Organizer Email"
                  {...formik.getFieldProps("organizerEmail")}
                />
              </div>

              <Label className="ml-2">Co-organizer details</Label>
              <div className="flex gap-2">
                <Input
                  id="coOrganizerName"
                  placeholder="Name"
                  {...formik.getFieldProps("coOrganizerName")}
                />
                <Input
                  id="coOrganizerMobileNumber"
                  placeholder="Mobile Number"
                  {...formik.getFieldProps("coOrganizerMobileNumber")}
                />
              </div>

              <div className="flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.campDate && "text-muted-foreground",
                      )}
                    >
                      <BsCalendar2Date className="mr-2" />
                      {formik.values.campDate ? (
                        format(formik.values.campDate, "PPP")
                      ) : (
                        <span>Camp Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      fromDate={new Date()}
                      selected={new Date(formik.values.campDate)}
                      onSelect={(date) =>
                        formik.setFieldValue("campDate", date)
                      } // update the date when it is changed
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2">
                {/* camp start time */}
                <div className="flex flex-col gap-1 w-full">
                  <Label className="ml-2">Camp Start Time</Label>
                  <Input
                    id="campStartTime"
                    type="time"
                    placeholder="Camp Start Time"
                    {...formik.getFieldProps("campStartTime")}
                  />
                </div>

                {/* camp end time */}
                <div className="flex flex-col gap-1 w-full">
                  <Label className="ml-2">Camp End Time</Label>
                  <Input
                    id="campEndTime"
                    type="time"
                    placeholder="Camp End Time"
                    {...formik.getFieldProps("campEndTime")}
                  />
                </div>
              </div>
            </div>
            {/* cretate a vertical line */}
            <hr className="border-r md:block hidden border-[#E5E5E5] h-64" />

            {/* Right side */}
            <div className="flex flex-col justify-between h-[22rem] w-full sm:w-auto">
              <div className="grid gap-2">
                <div>
                  <Input
                    id="estimatedParticipants"
                    type="number"
                    placeholder="Estimated Participants"
                    {...formik.getFieldProps("estimatedParticipants")}
                  />
                </div>

                <div>
                  <Input
                    id="supporter"
                    placeholder="Supporter"
                    {...formik.getFieldProps("supporter")}
                  />
                </div>

                <div>
                  <Input
                    id="remarks"
                    placeholder="Remarks"
                    {...formik.getFieldProps("remarks")}
                  />
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

          <div className="mt-4 text-center text-sm flex justify-between items-center gap-2 ">
            <div className="flex flex-col">
              Already have an account?{" "}
              <Link href="#" className="underline">
                Sign in
              </Link>
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
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CampSignupForm;
