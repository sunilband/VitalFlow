import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import SuperAdminLogin from "@/components/pages/SuperAdmin/SuperAdminLogin/SuperAdminLogin";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <SuperAdminLogin />
    </div>
  );
};

export default page;
