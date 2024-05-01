"use client";
import React, { useEffect, useRef } from "react";
import "./Certificate.css";
import { useUser } from "@/contexts/userContext";
import { useState } from "react";
import { getSelfDonations } from "@/lib/apiCalls/donor/getSelfDonations";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import QRCode from "react-qr-code";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MdFileDownload } from "react-icons/md";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

type Props = {};

interface Bloodbank {
  _id: string;
  name: string;
}

interface Camp {
  _id: string;
  organizationName: string;
  campName: string;
  address: any;
}

interface Component {
  component: string;
  quantity: number;
  _id: string;
}

interface Recipient {
  componentGiven: string;
  componentQuantityGiven: number;
}

interface ComponentDetails {
  componentType: string;
  componentQuantity: number;
  bloodGroup: string;
}

interface Donation {
  componentDetails: ComponentDetails;
  _id: string;
  donorId: string;
  donationTime: string;
  campId: Camp;
  extractedComponentsFromWholeBlood: Component[];
  recipients: Recipient[];
  createdAt: string;
  updatedAt: string;
  bloodbankId: Bloodbank;
  __v: number;
}

interface ApiResponse {
  status: number;
  data: Donation[];
  message: string;
  success: boolean;
}

const Certificate = (props: Props) => {
  const { user } = useUser();
  const [donations, setDonations] = useState<Donation[]>([]);
  useEffect(() => {
    try {
      getSelfDonations().then((data: ApiResponse) => {
        if (data.success) {
          setDonations(data.data);
        } else {
          toast.error("Failed to get donations");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getTargetElement = () => document.getElementById("content-id");
  const options = {
    // default is `save` , options are : open
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.NONE,
      // default is 'A4'
      format: "A4",
      // default is 'portrait'
      orientation: "landscape",
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/png",
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
        scale: 15, // Add this line
      },
    },
  };

  return (
    <Carousel className="sm:w-[800px] w-[300px] flex justify-center items-center h-full">
      <CarouselContent>
        {donations.map((donation, key) => {
          return (
            <CarouselItem key={key}>
              <div
                className="container pm-certificate-container sm:scale-90 scale-[0.4] -ml-[13rem] sm:ml-auto"
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
                      <p className="font-light">
                        Serial number: {donation._id}
                      </p>
                      <p className="mt-2">
                        We are highly thankful to{" "}
                        <span className="font-semibold ">{user.fullName}</span>{" "}
                        for donating {donation?.componentDetails.componentType}{" "}
                        at our affiliated camp organized by{" "}
                        <span className="font-semibold">
                          {donation?.campId?.organizationName}
                        </span>{" "}
                        dated{" "}
                        {new Date(donation?.donationTime).toLocaleDateString()}.
                        The contribution made by you is highly appreciated and
                        will be remembered by the needy.
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
                      <p>
                        {" "}
                        Blood group : {donation?.componentDetails.bloodGroup}
                      </p>
                      <p>
                        {" "}
                        Component : {donation?.componentDetails.componentType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center sm:-mt-5 -mt-10">
                {/* @ts-ignore */}
                <Button onClick={() => generatePDF(getTargetElement, options)}>
                  <MdFileDownload className="mr-2" />
                  Download
                </Button>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Certificate;
