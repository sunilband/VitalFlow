import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import Loader from "@/components/Loader/Loader";
import BloodBankPage from "@/components/pages/BloodBank/BloodBankPage/BloodBankPage";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <Suspense fallback={<Loader />}>
        <BloodBankPage />
      </Suspense>
    </div>
  );
};

export default page;
