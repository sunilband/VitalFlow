"use client";
import React from "react";
import OtpInput from "react-otp-input";

type Props = {
  fieldLength: number;
  otp: string;
  setOtp: (otp: string) => void;
};

const Otp = ({ fieldLength, otp, setOtp }: Props) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <OtpInput
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        inputStyle={{
          width: "3rem",
          height: "3rem",
          margin: "0 1rem",
          fontSize: "2rem",
          borderRadius: "5px",
          border: "1px solid #000",
        }}
        value={otp}
        onChange={setOtp}
        numInputs={fieldLength}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
};

export default Otp;
