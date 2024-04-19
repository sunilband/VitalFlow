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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import spinner from "../../../../../public/svgs/spinner.svg";
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
import { FaEye } from "react-icons/fa6";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { sendResisterEmailOtp } from "@/lib/apiCalls/camp/sendResisterEmailOtp";
import { changeBloodBankStatus } from "@/lib/apiCalls/superadmin/bloodbankManagement/changeBloodBankStatus";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ViewBloodBankDataModel from "./ViewBloodBankDataModel";

type Props = {};

const BloodBankAdminManagement = (props: Props) => {
  const [approvedBloodbanks, setApprovedBloodbanks] = React.useState([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [viewDataModelVisible, setViewDataModelVisible] = React.useState(false);
  const [selectedBloodBankView, setSelectedBloodBankView] =
    React.useState(null);

  const formik = useFormik({
    initialValues: {
      pincode: "",
      category: "",
      name: "",
      status: "",
      mode: "admin",
    },
    validationSchema: Yup.object({
      pincode: Yup.number().typeError("Pincode must be a number"),
      category: Yup.string().oneOf(
        ["Government", "RedCross", "Charitable/Vol", "Private"],
        "Invalid category",
      ),
      name: Yup.string(),
      status: Yup.string().oneOf(
        ["Pending", "Approved", "Rejected"],
        "Invalid status",
      ),
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
  }, [formik.values, dataUpdated]);

  const handleChangeStatus = (bloodbank: any, status: any) => {
    try {
      bloodbank.status = status;
      const data = changeBloodBankStatus({
        id: bloodbank._id,
        status: status,
      }).then((res) => {
        if (res.success) {
          setDataUpdated(!dataUpdated);
          toast.success("Status changed successfully for " + bloodbank.name);
        } else {
          toast.error(res.message);
        }
      });
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      {viewDataModelVisible && (
        <ViewBloodBankDataModel
          data={selectedBloodBankView}
          setViewDataModelVisible={setViewDataModelVisible}
        />
      )}
      {!viewDataModelVisible && (
        <Card className="mx-auto drop-shadow-2xl mt-28 sm:mt-0">
          <CardHeader>
            <CardTitle className="text-xl">Change Blood Bank Status</CardTitle>
            <CardDescription>
              Search and filter blood banks and manage approval status{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
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

                <div>
                  <Select
                    {...formik.getFieldProps("status")}
                    value={formik.values.status}
                    onValueChange={(e) => {
                      formik.setFieldValue("status", e === "All" ? "" : e);
                    }}
                  >
                    <SelectTrigger className="w-full text-[#71717A]">
                      <SelectValue placeholder={`Status`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                      <div className="flex gap-1">
                        {/* @ts-ignore */}
                        <p className="font-bold">{bloodbank.name}</p>
                        {/* @ts-ignore */}
                        <Badge variant="secondary" className="sm:block hidden">
                          <p
                            className={
                              // @ts-ignore
                              bloodbank.status === "Pending"
                                ? "text-yellow-400"
                                : // @ts-ignore
                                  bloodbank.status === "Approved"
                                  ? "text-green-400"
                                  : "text-red-400"
                            }
                          >
                            {/*  @ts-ignore */}
                            {bloodbank.status}
                          </p>
                        </Badge>
                      </div>
                      <p className="text-sm">
                        {/* @ts-ignore */}
                        {bloodbank.address.city} ({bloodbank.address.pincode})
                      </p>
                    </div>
                    {/* right div */}
                    <div className="flex gap-3 items-center justify-center">
                      {/* view details */}
                      <div>
                        <FaEye
                          className="cursor-pointer ml-1"
                          onClick={() => {
                            setSelectedBloodBankView(bloodbank);
                            setViewDataModelVisible(true);
                          }}
                        />
                      </div>
                      {/* change status */}
                      <div>
                        <Select
                          // @ts-ignore
                          value={bloodbank.status}
                          onValueChange={(e) =>
                            handleChangeStatus(bloodbank, e)
                          }
                        >
                          <SelectTrigger className="w-32 text-center text-[#71717A]">
                            <SelectValue placeholder={`Status`} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Approved">Approved</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BloodBankAdminManagement;
