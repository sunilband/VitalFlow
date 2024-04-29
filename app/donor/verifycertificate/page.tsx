import React from "react";
import VerifyCertificate from "@/components/pages/Donor/DonorPage/CertificationsManagement.tsx/VerifyCertificate";
import { GridBackgroundDemo } from "@/components/Backgrounds/Grid";
type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <div className="relative">
        <GridBackgroundDemo />
      </div>
      <VerifyCertificate />
    </div>
  );
};

export default Page;
