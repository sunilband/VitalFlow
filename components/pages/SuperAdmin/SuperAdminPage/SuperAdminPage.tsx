"use client";
import React, { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getSuperAdmin } from "@/lib/apiCalls/superadmin/getSuperAdmin";
type Props = {};

const SuperAdminPage = (props: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();

  // check if doner exists
  useEffect(() => {
    if (!user) {
      try {
        getSuperAdmin().then((data) => {
          if (data.success) {
            console.log("data", data.data);
            setUser(data.data.superAdmin);
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
      SuperAdminPage
    </div>
  );
};

export default SuperAdminPage;
