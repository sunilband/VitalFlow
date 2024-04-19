"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getSuperAdmin } from "@/lib/apiCalls/superadmin/getSuperAdmin";
import Aside from "./Aside";
import BloodBankAdminManagement from "./BloodBankAdminManagement/BloodBankAdminManagement";
type Props = {};

const SuperAdminPage = (props: Props) => {
  const { user, setUser } = useUser();
  const [selectedLink, setSelectedLink] = useState("Dashboard");
  const router = useRouter();

  // check if doner exists
  useEffect(() => {
    if (!user) {
      try {
        getSuperAdmin().then((data) => {
          if (data.success) {
            console.log("data", data.data);
            setUser(data.data);
            console.log("user", user);
          } else {
            router.push("/superadmin/login");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-calculated">
      <Aside
        {...{
          selectedLink,
          setSelectedLink,
        }}
      />
      {/* View */}
      <div className="border relative w-full h-[90%] ml-2 sm:ml-16 mr-2 overflow-auto p-2 rounded-md z-50 sm:z-[5] flex justify-center items-center">
        {selectedLink === "Dashboard" && <div>Dashboard</div>}
        {selectedLink === "Blood Banks" && <BloodBankAdminManagement />}
        {selectedLink === "Donation Camps" && <div>Donation Camps</div>}
        {selectedLink === "Donors" && <div>Donors</div>}
        {selectedLink === "Analytics" && <div>Analytics</div>}
        {selectedLink === "Settings" && <div>Settings</div>}
      </div>
    </div>
  );
};

export default SuperAdminPage;
