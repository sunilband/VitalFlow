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
import { changeBloodBankStatus } from "@/lib/apiCalls/superadmin/bloodbankManagement/changeBloodBankStatus";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ViewCampDataModel from "./ViewCampDataModel";
import { getRegisteredCamps } from "@/lib/apiCalls/bloodbank/getRegisteredCamps";
import { changeCampStatus } from "@/lib/apiCalls/bloodbank/changeCampStatus";
import { BsCalendar2Date } from "react-icons/bs";

// const getCamps = asyncHandler(async (req, res, next) => {
//   const query = {};

//   if (req.query.status) query.status = req.query.status;

//   if (req.query.organizationType)
//     query.organizationType = req.query.organizationType;

//   if (req.query.date) query.organizationType = req.query.date;

//   if (req.query.name) {
//     query.name = { $regex: new RegExp("^" + name, "i") };
//   }

//   if (req.query.address) {
//     query["address.state"] = req.query.address.state;
//     query["address.city"] = req.query.address.city;
//   }
//   const bloodBankId = req.user._id.toHexString();
//   query.bloodbank = bloodBankId;
//   const camps = await DonationCamp.find(query);
//   res.status(200).json(new ApiResponse(200, { camps }));
// });

type Props = {};

const ChangeCampStatus = (props: Props) => {
  const [approvedCamps, setApprovedCamps] = React.useState([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [viewDataModelVisible, setViewDataModelVisible] = React.useState(false);
  const [selectedCampView, setSelectedCampView] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      status: "",
      organizationType: "",
      date: "",
      pincode: "",
      name: "",
    },
    validationSchema: Yup.object({
      pincode: Yup.number().typeError("Pincode must be a number"),
      organizationType: Yup.string().oneOf(
        [
          "Sewa hi Sangathan - Health Volunteers",
          "Terapanth Yuvak Parishad",
          "RedCross",
          "RWA",
          "Other",
        ],
        "Invalid organization type",
      ),
      name: Yup.string(),
      status: Yup.string().oneOf(
        ["Pending", "Approved", "Rejected"],
        "Invalid status",
      ),
      date: Yup.date(),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  React.useEffect(() => {
    // Fetch all approved bloodbanks
    const data = getRegisteredCamps({})
      .then((res) => {
        if (res.success) {
          console.log("yoyo", res.data.camps);
          setApprovedCamps(res.data.camps);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, []);

  const searchDonationCamps = () => {
    const data = getRegisteredCamps({ ...formik.values })
      .then((res) => {
        if (res.success) {
          console.log(res.data.camps);
          setApprovedCamps(res.data.camps);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    console.log(formik.values, "blood bank values", approvedCamps);
    searchDonationCamps();
  }, [formik.values, dataUpdated]);

  const handleChangeStatus = (bloodbank: any, status: any) => {
    try {
      bloodbank.status = status;
      const data = changeCampStatus({
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
        <ViewCampDataModel
          data={selectedCampView}
          setViewDataModelVisible={setViewDataModelVisible}
        />
      )}
      {!viewDataModelVisible && (
        <Card className="mx-auto drop-shadow-2xl mt-28 sm:mt-0">
          <CardHeader>
            <CardTitle className="text-xl">Change Doantion Camp</CardTitle>
            <CardDescription>
              Search and filter Donation Camps and manage approval status{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex w-full flex-col gap-2">
                <div className="relative">
                  <CiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Name..."
                    className="w-full appearance-none bg-background pl-8 shadow-none "
                    id="name"
                    {...formik.getFieldProps("name")}
                  />
                </div>

                <div className="flex gap-2">
                  <div>
                    <Select
                      {...formik.getFieldProps("status")}
                      value={formik.values.status}
                      onValueChange={(e) => {
                        formik.setFieldValue("status", e === "All" ? "" : e);
                      }}
                    >
                      <SelectTrigger className="w-36 text-[#71717A]">
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
                      className="w-36"
                    />
                    <Select
                      {...formik.getFieldProps("organizationType")}
                      value={formik.values.organizationType}
                      onValueChange={(e) => {
                        formik.setFieldValue(
                          "organizationType",
                          e === "All" ? undefined : e,
                        );
                      }}
                    >
                      <SelectTrigger className="w-36 text-[#71717A]">
                        <SelectValue placeholder={`Type`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Organization Type</SelectLabel>
                          <SelectItem value="All">All</SelectItem>
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-36 justify-start text-left font-normal",
                            !formik.values.date && "text-muted-foreground",
                          )}
                        >
                          <BsCalendar2Date className="mr-2" />
                          {formik.values.date ? (
                            format(formik.values.date, "PPP")
                          ) : (
                            <span>Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          // fromDate={new Date()}
                          selected={new Date(formik.values.date)}
                          onSelect={(date) =>
                            formik.setFieldValue("date", date)
                          } // update the date when it is changed
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* results */}
              <div className="my-2 border rounded-md flex flex-col max-h-56 overflow-auto">
                {approvedCamps?.map((camp) => (
                  <div
                    // @ts-ignore
                    key={camp._id}
                    className="flex justify-between items-center p-2 px-4 border-b"
                  >
                    <div>
                      <div className="flex gap-1">
                        {/* @ts-ignore */}
                        <p className="font-bold">{camp.campName}</p>
                        {/* @ts-ignore */}
                        <Badge variant="secondary" className="sm:block hidden">
                          <p
                            className={
                              // @ts-ignore
                              camp.status === "Pending"
                                ? "text-yellow-400"
                                : // @ts-ignore
                                  camp.status === "Approved"
                                  ? "text-green-400"
                                  : "text-red-400"
                            }
                          >
                            {/*  @ts-ignore */}
                            {camp.status}
                          </p>
                        </Badge>
                      </div>
                      <p className="text-sm">
                        {/* @ts-ignore */}
                        {camp.address.city} ({camp.address.pincode})
                      </p>
                      <p className="text-sm font-extralight">
                        {/* @ts-ignore */}
                        {new Date(camp.campDate).toLocaleString()}
                      </p>
                    </div>
                    {/* right div */}
                    <div className="flex gap-3 items-center justify-center">
                      {/* view details */}
                      <div>
                        <FaEye
                          className="cursor-pointer ml-1"
                          onClick={() => {
                            setSelectedCampView(camp);
                            setViewDataModelVisible(true);
                          }}
                        />
                      </div>
                      {/* change status */}
                      <div>
                        <Select
                          // @ts-ignore
                          value={camp.status}
                          onValueChange={(e) => handleChangeStatus(camp, e)}
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

export default ChangeCampStatus;
