import React from "react";
import DonorLogin from "@/components/pages/Donor/DonorLogin/DonerLogin";
import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <DonorLogin />
    </div>
  );
};

export default page;
