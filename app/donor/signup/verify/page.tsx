import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import VerifyUser from "@/components/pages/Donor/DonorSignup/VerifyUser.tsx/VerifyUser";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <VerifyUser />
    </div>
  );
};

export default page;
