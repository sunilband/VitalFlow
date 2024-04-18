import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import CaampSignup from "@/components/pages/Camp/CampSignup/CampSignup";
import CampSignupForm from "@/components/pages/Camp/CampSignup/CampSignupForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <CaampSignup />
    </div>
  );
};

export default page;
