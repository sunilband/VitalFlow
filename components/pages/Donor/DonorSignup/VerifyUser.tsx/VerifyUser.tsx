"use client";
import React, { useState } from "react";
import Otp from "./Otp";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { verifyOtp } from "@/lib/apiCalls/signup/otpCalls";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { registerDoner } from "@/lib/apiCalls/signup/registerDoner";
import jwt from "jsonwebtoken";

type Props = {};

const VerifyUser = (props: Props) => {
  const searchParams = useSearchParams();
  let params: any = searchParams.get("values") || "";
  try {
    params = jwt.verify(params, "secret");
    console.log("decryptedParams", params);
  } catch (error) {
    console.log("error", error);
  }
  const [otp, setOtp] = React.useState("");
  const [selectedVerificationMethod, setSelectedverificationMethod] =
    useState("phone");

  const handleVerify = async () => {
    try {
      const verifiedOTP = await verifyOtp({
        otp,
        phoneOrEmail:
          selectedVerificationMethod === "phone" ? params.phone : params.email,
      });

      if (!verifiedOTP.success) {
        toast.error(verifiedOTP.message);
        return;
      }

      if (verifiedOTP.success) {
        toast.message(verifiedOTP.message);
        const registerUser = await registerDoner({ ...params });
        if (registerUser.success) {
          toast.success("User Registered Successfully");
        }
      }
    } catch (error) {}
  };
  return (
    <div className="h-calculated w-screen flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-col gap-4 glass p-4 rounded-md border">
        <div className=" flex flex-col gap-2 justify-center items-center">
          <p className="text-center text-lg">
            OTP were sent to your Phone and email
          </p>
          <Tabs
            defaultValue="phone"
            onValueChange={(e) => {
              setSelectedverificationMethod(e);
            }}
          >
            <div>
              <p className="text-center font-light mb-2">Verify using </p>
              <TabsList>
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        <Otp fieldLength={6} otp={otp} setOtp={setOtp} />
        <Button onClick={handleVerify}>Verify</Button>
      </div>
    </div>
  );
};

export default VerifyUser;
