import React from "react";
import BloodBankSignupForm from "./BloodBankSignupForm";

type Props = {};

const BloodBankSignup = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-calculated overflow-auto px-3">
      <BloodBankSignupForm />
    </div>
  );
};

export default BloodBankSignup;
