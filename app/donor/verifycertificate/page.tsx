import React, { Suspense } from "react";
import VerifyCertificate from "@/components/pages/Donor/DonorPage/CertificationsManagement.tsx/VerifyCertificate";
import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
import Loader from "@/components/Loader/Loader";
type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <div className="relative">
          <GridBackgroundDemo />
        </div>
        <VerifyCertificate />
      </Suspense>
    </div>
  );
};

export default Page;
