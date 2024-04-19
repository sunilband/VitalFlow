import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import CampLogin from "@/components/pages/Camp/CampLogin/CampLogin";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <CampLogin />
    </div>
  );
};

export default page;
