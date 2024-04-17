"use client";
import React, { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getBloodbank } from "@/lib/apiCalls/bloodbank/getBloodBank";
type Props = {};

const BloodBankPage = (props: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();

  // check if doner exists
  useEffect(() => {
    if (!user) {
      try {
        getBloodbank().then((data) => {
          if (data.success) {
            console.log("data", data.data);
            setUser(data.data);
          } else {
            router.push("/bloodbank/login");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-calculated">
      BloodBankPage
    </div>
  );
};

export default BloodBankPage;
