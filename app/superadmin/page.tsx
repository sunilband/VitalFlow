import Loader from "@/components/Loader/Loader";
import SuperAdminPage from "@/components/pages/SuperAdmin/SuperAdminPage/SuperAdminPage";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <SuperAdminPage />
      </Suspense>
    </div>
  );
};

export default page;
