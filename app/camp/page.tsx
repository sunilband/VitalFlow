import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import Loader from "@/components/Loader/Loader";
import CampPage from "@/components/pages/Camp/CampPage/CampPage";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <Suspense fallback={<Loader />}>
        <CampPage />
      </Suspense>
    </div>
  );
};

export default page;
