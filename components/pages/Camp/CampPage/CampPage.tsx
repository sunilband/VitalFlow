"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getBloodbank } from "@/lib/apiCalls/bloodbank/getBloodBank";
import { getCamp } from "@/lib/apiCalls/camp/getCamp";
import Aside from "./AsideForCamp";
import { BackgroundBeams } from "@/components/Backgrounds/Beams/BackgroundBeams";
import DonorManegement from "./DonorManagement/DonorManagement";
import DonationsManagement from "./DonationsManagement/DonationsManagement";
import { ChatLayout } from "@/components/Chat/chat-layout";
import { campChat } from "@/lib/apiCalls/Chat/campChat";
type Props = {};

const CampPage = (props: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [selectedLink, setSelectedLink] = useState("Dashboard");

  // check if doner exists
  useEffect(() => {
    if (!user) {
      try {
        getCamp().then((data) => {
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
    <div className="flex justify-center items-center h-calculated drop-shadow-md">
      {/* left sidebar */}
      {user && user.organizationName && user.status == "Approved" ? (
        <>
          <Aside
            {...{
              selectedLink,
              setSelectedLink,
            }}
          />
          {/* View */}
          <div className="sm:border relative w-full h-[90%] sm:ml-20 sm:mr-2 overflow-auto p-2 rounded-md z-50 sm:z-[5] flex justify-center items-center sm:bg-opacity-80 bg-opacity-0 sm:bg-background">
            {selectedLink === "Dashboard" && <div>Dashboard</div>}
            {selectedLink === "Donors" && <DonorManegement />}
            {selectedLink === "Donations" && <DonationsManagement />}
            {selectedLink === "Chat" && (
              <ChatLayout
                defaultLayout={undefined}
                navCollapsedSize={8}
                chatFunction={campChat}
              />
            )}
            {selectedLink === "Analytics" && <div>Analytics</div>}
            {selectedLink === "Settings" && <div>Settings</div>}
          </div>
        </>
      ) : (
        <p>Approval Pending by Affiliated Blood Bank or unauthorized</p>
      )}
    </div>
  );
};

export default CampPage;
