import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import VerifyCampEmail from "@/components/pages/Camp/CampSignup/VerifyCampEmail/VerifyCampEmail";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <VerifyCampEmail />
    </div>
  );
};

export default page;
