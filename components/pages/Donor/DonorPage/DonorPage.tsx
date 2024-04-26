"use client";
import React, { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { getDonor } from "@/lib/apiCalls/donor/getDonor";
type Props = {};

const DonorPage = (props: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();

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
    <div className="flex justify-center items-center h-calculated">
      {user && user.fullName ? <>DonorPage</> : null}
    </div>
  );
};

export default DonorPage;
