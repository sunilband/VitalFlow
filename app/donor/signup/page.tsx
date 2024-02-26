import React from "react";
import DonorSignup from "@/components/pages/Donor/DonorSignup/DonorSignup";
import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <DonorSignup />
    </div>
  );
};

export default page;
