"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import spinner from "../../../../../public/svgs/spinner.svg";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ViewBloodBankDataModel from "./ViewDonorModel";
import { getDonors } from "@/lib/apiCalls/camp/getDonors";
import CreateDonationModel from "./CreateDonationModel";

type Props = {};

const DonorManagement = (props: Props) => {
  const [approvedDonors, setApprovedDonors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [viewDataModelVisible, setViewDataModelVisible] = React.useState(false);
  const [viewDonationModelVisible, setViewDonationModelVisible] =
    React.useState(false);
  const [selectedBloodBankView, setSelectedBloodBankView] =
    React.useState(null);
  const [selectedDonor, setSelectedDonor] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      phone: Yup.string().matches(
        /^[0-9]{10}$/,
        "Phone number must be 10 digits",
      ),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  React.useEffect(() => {
    // Fetch all approved bloodbanks
    const data = getDonors({})
      .then((res) => {
        if (res.success) {
          console.log(res.data);
          setApprovedDonors(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, []);

  const searchDonors = () => {
    const data = getDonors({ ...formik.values, fullName: formik.values.name })
      .then((res) => {
        if (res.success) {
          console.log(res.data);
          setApprovedDonors(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    console.log(formik.values, "donor values", approvedDonors);
    searchDonors();
  }, [formik.values, dataUpdated]);

  const handleCreateDonation = (donor: any) => {
    setViewDonationModelVisible(true);
  };

  return (
    <>
      {viewDataModelVisible && (
        <ViewBloodBankDataModel
          data={selectedBloodBankView}
          setViewDataModelVisible={setViewDataModelVisible}
          setViewDonationModelVisible={setViewDonationModelVisible}
        />
      )}

      {viewDonationModelVisible && (
        <CreateDonationModel
          data={selectedDonor}
          setViewDataModelVisible={setViewDataModelVisible}
          setViewDonationModelVisible={setViewDonationModelVisible}
        />
      )}

      {!viewDataModelVisible && !viewDonationModelVisible && (
        <Card className="mx-auto drop-shadow-2xl mt-28 sm:mt-0">
          <CardHeader>
            <CardTitle className="text-xl">Find Donors</CardTitle>
            <CardDescription>Find donors and recieve donation </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
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

                <div className="relative">
                  <MdOutlineEmail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    type="search"
                    placeholder="Email..."
                    className="w-full appearance-none bg-background pl-8 shadow-none "
                    id="email"
                    {...formik.getFieldProps("email")}
                  />
                </div>

                <div className="relative">
                  <MdOutlinePhone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Phone..."
                    className="w-full appearance-none bg-background pl-8 shadow-none "
                    id="phone"
                    {...formik.getFieldProps("phone")}
                  />
                </div>
              </div>

              {/* results */}
              <div className="my-2 border rounded-md flex flex-col max-h-56 overflow-auto">
                {approvedDonors.map((donor) => (
                  <div
                    // @ts-ignore
                    key={donor._id}
                    className="flex justify-between items-center p-2 px-4 border-b"
                  >
                    <div>
                      <div className="flex gap-1">
                        {/* @ts-ignore */}
                        <p className="font-bold">{donor.fullName}</p>
                        {/* @ts-ignore */}
                        <Badge
                          variant="secondary"
                          className="sm:block hidden ml-2"
                        >
                          <p className="text-red-400">
                            {/*  @ts-ignore */}
                            {donor.bloodGroup}
                          </p>
                        </Badge>
                      </div>
                      <p className="text-sm font-light">
                        {/* @ts-ignore */}
                        {donor.email}
                      </p>
                      <p className="text-sm font-light">
                        {/* @ts-ignore */}
                        {donor.phone}
                      </p>
                    </div>

                    {/* right div */}
                    <div className="flex gap-3 items-center justify-center">
                      {/* view details */}
                      <div>
                        <FaEye
                          className="cursor-pointer ml-1"
                          onClick={() => {
                            setSelectedBloodBankView(donor);
                            setViewDataModelVisible(true);
                          }}
                        />
                      </div>
                      {/* create donation button */}
                      <div>
                        <Button
                          disabled={isLoading}
                          onClick={() => {
                            setSelectedDonor(donor);
                            handleCreateDonation(donor);
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
                          Create Donation
                        </Button>
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

export default DonorManagement;
