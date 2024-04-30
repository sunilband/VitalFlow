import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import Loader from "@/components/Loader/Loader";
import DonorPage from "@/components/pages/Donor/DonorPage/DonorPage";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <div className="relative">
          <GridBackgroundDemo />
        </div>
        <DonorPage />
      </Suspense>
    </div>
  );
};

export default page;
