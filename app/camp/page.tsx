import Loader from "@/components/Loader/Loader";
import CampPage from "@/components/pages/Camp/CampPage/CampPage";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <CampPage />
      </Suspense>
    </div>
  );
};

export default page;
