"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef } from "react";
import "./Certificate.css";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import QRCode from "react-qr-code";
import { verifyCertificate } from "@/lib/apiCalls/donor/verifyCertificate";
import Loader from "@/components/Loader/Loader";

type Props = {};

const VerifyCertificate = (props: Props) => {
  const searchParams = useSearchParams();
  const [donation, setDonation] = useState<any>(null);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const data = await verifyCertificate({ id });
        if (data.success) {
          console.log("this is data", data);
          setDonation(data.data[0]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCertificate();
  }, []);

  return (
    <div className="h-calculated scale-50 md:scale-75 lg:scale-100 flex justify-center items-center">
      {!donation && <Loader />}
      {donation && (
        <div>
          <div
            className="container pm-certificate-container scale-90"
            id="content-id"
          >
            <div className="outer-border" />
            <div className="inner-border" />
            <div className="pm-certificate-border col-xs-12">
              <div className="row pm-certificate-header">
                <div className="text-3xl tracking-widest mt-2 col-xs-12 text-center">
                  <h2 className="text-[#E11D48] font-bold">Vital~Flow</h2>
                </div>
              </div>
              <div className="row pm-certificate-body -mt-6">
                <p className="text-md text-center text-xl">
                  {donation?.campId.campName} by{" "}
                  {donation?.campId?.organizationName}{" "}
                </p>
                <p className="text-sm text-center ">
                  {donation?.campId?.address?.state} (
                  {donation?.campId?.address?.city})
                </p>
                <Separator className="my-4" />
                <div className="leading-8 text-lg">
                  <p className="font-light">Serial number: {donation._id}</p>
                  <p className="mt-2">
                    We are highly thankful to{" "}
                    <span className="font-semibold ">
                      {donation.donorId.fullName}
                    </span>{" "}
                    for donating {donation?.componentDetails.componentType} at
                    our affiliated camp organized by{" "}
                    <span className="font-semibold">
                      {donation?.campId?.organizationName}
                    </span>{" "}
                    dated{" "}
                    {new Date(donation?.donationTime).toLocaleDateString()}. The
                    contribution made by you is highly appreciated and will be
                    remembered by the needy.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-sm ml-2">
                Scan the QR code to verify this certificate
              </p>
              <div className="w-full flex justify-between py-2 px-3 items-center ">
                <QRCode
                  value={`https://vitalflow.vercel.app/donor/verifycertificate?id=${donation._id}`}
                  className="h-16"
                />
                <div className="flex flex-col gap-3">
                  <p> Blood group : {donation?.componentDetails.bloodGroup}</p>
                  <p> Component : {donation?.componentDetails.componentType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
