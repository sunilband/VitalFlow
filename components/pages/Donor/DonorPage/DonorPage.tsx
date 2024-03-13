"use client";
import React, { useEffect } from "react";
import { useDonor } from "@/contexts/donorContext";
import { useRouter } from "next/navigation";
import { getDonor } from "@/lib/apiCalls/donor/getDonor";
type Props = {};

const DonorPage = (props: Props) => {
  const { donor, setDonor } = useDonor();
  const router = useRouter();

  // check if doner exists
  useEffect(() => {
    if (!donor) {
      try {
        getDonor().then((data) => {
          if (data.success) {
            setDonor(data.data[0]);
          } else {
            router.push("/donor/login");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  console.log("donor", donor);

  return (
    <div className="flex justify-center items-center h-calculated">
      DonorPage
    </div>
  );
};

export default DonorPage;
