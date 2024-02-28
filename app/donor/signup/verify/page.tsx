import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import VerifyUser from "@/components/pages/Donor/DonorSignup/VerifyUser.tsx/VerifyUser";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <Suspense fallback="VerifyUserFallback">
        <VerifyUser />
      </Suspense>
    </div>
  );
};

export default page;
