import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import BloodBankPage from "@/components/pages/BloodBank/BloodBankPage/BloodBankPage";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <BloodBankPage />
    </div>
  );
};

export default page;