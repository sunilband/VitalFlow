import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import VerifyCampEmail from "@/components/pages/Camp/CampSignup/VerifyCampEmail/VerifyCampEmail";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative">
          <GridBackgroundDemo />
        </div>
        <VerifyCampEmail />
      </Suspense>
    </div>
  );
};

export default page;
