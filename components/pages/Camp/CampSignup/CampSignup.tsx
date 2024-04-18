import React from "react";
import BloodBankSignupForm from "./CampSignupForm";
import CampSignupForm from "./CampSignupForm";

type Props = {};

const CaampSignup = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-calculated overflow-auto px-3">
      <CampSignupForm />
    </div>
  );
};

export default CaampSignup;
