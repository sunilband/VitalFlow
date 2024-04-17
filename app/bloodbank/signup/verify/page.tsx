import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import VerifyBloodBank from "@/components/pages/BloodBank/BloodBankSignup/VerifyBloodBank/VerifyBloodBank";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <Suspense fallback="VerifyUserFallback">
        <VerifyBloodBank />
      </Suspense>
    </div>
  );
};

export default page;
