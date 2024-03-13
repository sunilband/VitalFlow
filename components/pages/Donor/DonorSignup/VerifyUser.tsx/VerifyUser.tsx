"use client";
import React, { useEffect, useState } from "react";
import Otp from "./Otp";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { verifyOtp } from "@/lib/apiCalls/donor/otpCalls";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { registerDoner } from "@/lib/apiCalls/donor/registerDoner";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useDonor } from "@/contexts/donorContext";

type Props = {};

const VerifyUser = (props: Props) => {
  const router = useRouter();
  const { donor, setDonor } = useDonor();
  const searchParams = useSearchParams();
  let params: any = searchParams.get("values") || "";

  try {
    params = jwt.verify(params, "secret");
    console.log("decryptedParams", params);
  } catch (error) {
    console.log("error", error);
  }

  useEffect(() => {
    if (!params) {
      return router.push("/donor/signup");
    }
  }, [params]);

  const [otp, setOtp] = React.useState("");
  const [selectedVerificationMethod, setSelectedverificationMethod] =
    useState("phone");

  useEffect(() => {
    if (donor) {
      router.push("/donor");
    }
  }, []);

  const handleVerify = async () => {
    console.log("params");
    try {
      const verifiedOTP = await verifyOtp({
        otp,
        phoneOrEmail:
          selectedVerificationMethod === "phone" ? params.phone : params.email,
      });

      if (!verifiedOTP.success) {
        toast.error(
          verifiedOTP.message + " " + "& Please check OTP from Phone / Email",
        );
        return;
      }

      if (verifiedOTP.success) {
        toast.message(verifiedOTP.message);
        const registerUser = await registerDoner({ ...params });
        if (!registerUser.success) {
          toast.error(registerUser.message);
        }
        if (registerUser.success) {
          toast.success("User Registered Successfully");
          console.log("registerUser", registerUser);
          setDonor({ ...registerUser.data[0] });
          console.log("donor is", donor);
          router.push("/donor");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="h-calculated w-screen flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-col gap-4 glass p-4 rounded-md border">
        <div className=" flex flex-col gap-2 justify-center items-center">
          <p className="text-center text-lg font-light">
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
              <TabsList className="w-64">
                <TabsTrigger value="phone" className="w-56">
                  Phone
                </TabsTrigger>
                <TabsTrigger value="email" className="w-56">
                  Email
                </TabsTrigger>
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
