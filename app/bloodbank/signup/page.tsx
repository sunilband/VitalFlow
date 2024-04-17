import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import BloodBankSignup from "@/components/pages/BloodBank/BloodBankSignup/BloodBankSignup";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <BloodBankSignup />
    </div>
  );
};

export default page;
