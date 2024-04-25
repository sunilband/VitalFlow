import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import SelectBloodBank from "@/components/pages/Camp/CampSignup/SelectBloodBank";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative">
          <GridBackgroundDemo />
        </div>
        <SelectBloodBank />
      </Suspense>
    </div>
  );
};

export default page;
