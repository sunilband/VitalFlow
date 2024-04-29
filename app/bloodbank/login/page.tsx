import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import BloodBankLogin from "@/components/pages/BloodBank/BloodBankLogin/BloodBankLogin";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-screen max-w-screen overflow-hidden">
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <BloodBankLogin />
    </div>
  );
};

export default page;
