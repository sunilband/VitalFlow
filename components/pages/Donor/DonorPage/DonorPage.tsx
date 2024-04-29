"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getBloodbank } from "@/lib/apiCalls/bloodbank/getBloodBank";
import { getDonor } from "@/lib/apiCalls/donor/getDonor";
import Aside from "./AsideForDonor";
import { BackgroundBeams } from "@/components/Backgrounds/Beams/BackgroundBeams";
import { ChatLayout } from "../Chat/chat-layout";
import Certificate from "./CertificationsManagement.tsx/Certificate";
type Props = {};

const DonorPage = (props: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [selectedLink, setSelectedLink] = useState("Dashboard");

  // check if doner exists
  useEffect(() => {
    if (!user) {
      try {
        getDonor().then((data) => {
          if (data.success) {
            console.log("data", data.data);
            setUser(data.data);
          } else {
            router.push("/camp/login");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-calculated">
      {/* left sidebar */}
      {user && user.fullName ? (
        <>
          <Aside
            {...{
              selectedLink,
              setSelectedLink,
            }}
          />
          {/* View */}
          <div className="border relative w-full h-[90%] ml-2 sm:ml-20 mr-4 overflow-auto p-2 rounded-md z-50 sm:z-[5] flex justify-center items-center bg-opacity-80 bg-background">
            {/* Background */}
            <BackgroundBeams />
            {selectedLink === "Dashboard" && <div>Dashboard</div>}
            {selectedLink === "Certificates" && <Certificate />}
            {selectedLink === "Donations" && <p>Donation Management</p>}
            {selectedLink === "Chat" && (
              <ChatLayout defaultLayout={undefined} navCollapsedSize={8} />
            )}
            {selectedLink === "Analytics" && <div>Analytics</div>}
            {selectedLink === "Settings" && <div>Settings</div>}
          </div>
        </>
      ) : (
        <p>No Details Found</p>
      )}
    </div>
  );
};

export default DonorPage;
