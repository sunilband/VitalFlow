"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getDonor } from "@/lib/apiCalls/donor/getDonor";
import Aside from "./AsideForDonor";
import { ChatLayout } from "@/components/Chat/chat-layout";
import Certificate from "./CertificationsManagement.tsx/Certificate";
import DonationsManagement from "./DonationsManagement/DonationsManagement";
import { donorChat } from "@/lib/apiCalls/Chat/donorChat";

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
            router.push("/donor/login");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-calculated drop-shadow-md">
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
          <div className="sm:border relative w-full h-[90%] sm:ml-20 sm:mr-2 overflow-auto p-2 rounded-md z-50 sm:z-[5] flex justify-center items-center sm:bg-opacity-80 bg-opacity-0 sm:bg-background">
            {selectedLink === "Certificates" && <Certificate />}
            {selectedLink === "Dashboard" && <div>Dashboard</div>}
            {selectedLink === "Donations" && <DonationsManagement />}
            {selectedLink === "Chat" && (
              <ChatLayout
                defaultLayout={undefined}
                navCollapsedSize={8}
                chatFunction={donorChat}
              />
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
