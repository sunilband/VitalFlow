"use client";
import { getRegisteredBloodBank } from "@/lib/apiCalls/camp/getRegisteredBloodBank";
import React, { useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import spinner from "../../../../public/svgs/spinner.svg";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { sendResisterEmailOtp } from "@/lib/apiCalls/camp/sendResisterEmailOtp";

type Props = {};

const SelectBloodBank = (props: Props) => {
  const [approvedBloodbanks, setApprovedBloodbanks] = React.useState([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  let params: any = searchParams.get("values") || "";

  try {
    params = jwt.verify(params, "secret");
    console.log(params);
  } catch (error) {
    console.log("error", error);
  }

  const formik = useFormik({
    initialValues: {
      pincode: "",
      category: "",
      name: "",
    },
    validationSchema: Yup.object({
      pincode: Yup.number().typeError("Pincode must be a number"),
      category: Yup.string().oneOf(
        ["Government", "RedCross", "Charitable/Vol", "Private"],
        "Invalid category",
      ),
      name: Yup.string(),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  React.useEffect(() => {
    // Fetch all approved bloodbanks
    const data = getRegisteredBloodBank({})
      .then((res) => {
        if (res.success) {
          console.log(res.data);
          setApprovedBloodbanks(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, []);

  const searchBloodBanks = () => {
    const data = getRegisteredBloodBank({ ...formik.values })
      .then((res) => {
        if (res.success) {
          console.log(res.data);
          setApprovedBloodbanks(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    console.log(formik.values, "blood bank values", approvedBloodbanks);
    searchBloodBanks();
  }, [formik.values]);

  const handleSelectBloodBank = (bloodbank: any) => {
    params.bloodbank = bloodbank._id;
    try {
      sendResisterEmailOtp(params.organizerEmail)
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
          const secretInputs = jwt.sign(params, "secret");
          router.push(`/camp/signup/verify?values=${secretInputs}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-calculated overflow-auto px-3">
      <Card className="mx-auto drop-shadow-2xl mt-28 sm:mt-0">
        <CardHeader>
          <CardTitle className="text-xl">Select Blood bank</CardTitle>
          <CardDescription>
            Register your camp for registered bloodbanks{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="relative">
                <CiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Name..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 "
                  id="name"
                  {...formik.getFieldProps("name")}
                />
              </div>

              <div className="flex gap-2">
                <Input
                  id="pincode"
                  placeholder="Pincode"
                  {...formik.getFieldProps("pincode")}
                />
                <Select
                  {...formik.getFieldProps("category")}
                  value={formik.values.category}
                  onValueChange={(e) => {
                    formik.setFieldValue(
                      "category",
                      e === "All" ? undefined : e,
                    );
                  }}
                >
                  <SelectTrigger className="w-full text-[#71717A]">
                    <SelectValue placeholder={`Category`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="RedCross">RedCross</SelectItem>
                      <SelectItem value="Charitable/Vol">
                        Charitable/Vol
                      </SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* results */}
            <div className="my-2 border rounded-md flex flex-col max-h-56 overflow-auto">
              {approvedBloodbanks.map((bloodbank) => (
                <div
                  // @ts-ignore
                  key={bloodbank._id}
                  className="flex justify-between items-center p-2 px-4 border-b"
                >
                  <div>
                    {/* @ts-ignore */}
                    <p className="font-bold">{bloodbank.name}</p>
                    <p className="text-sm">
                      {/* @ts-ignore */}
                      {bloodbank.address.city} ({bloodbank.address.pincode})
                    </p>
                  </div>
                  <div>
                    <Button
                      disabled={isLoading}
                      onClick={() => {
                        handleSelectBloodBank(bloodbank);
                      }}
                    >
                      {isLoading && (
                        <Image
                          src={spinner}
                          alt="spinner"
                          width={20}
                          height={20}
                          className="mr-2 h-4 w-4 animate-spin"
                        />
                      )}
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectBloodBank;
