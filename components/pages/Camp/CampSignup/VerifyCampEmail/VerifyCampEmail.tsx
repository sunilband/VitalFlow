"use client";
import React, { useEffect, useState } from "react";
import Otp from "./Otp";
import { Button } from "@/components/ui/button";
import { verifyRegisterEmailOtp } from "@/lib/apiCalls/camp/verifyRegisterEmailOtp";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { registerCamp } from "@/lib/apiCalls/camp/registerCamp";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import { Input } from "../../../../ui/input";
import Image from "next/image";
import spinner from "../.../../../../../../public/svgs/spinner.svg";

type Props = {};

const VerifyCampEmail = (props: Props) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = React.useState("");

  let params: any = searchParams.get("values") || "";

  try {
    params = jwt.verify(params, "secret");
    console.log(params);
  } catch (error) {
    console.log("error", error);
  }

  useEffect(() => {
    if (!params) {
      return router.push("/camp/signup");
    }
  }, [params]);

  useEffect(() => {
    if (user) {
      router.push("/camp");
    }
  }, []);

  const handleVerify = async () => {
    setIsLoading(true);
    console.log("params");
    try {
      const verifiedOTP = await verifyRegisterEmailOtp({
        otp,
        email: params.organizerEmail,
      });

      if (!verifiedOTP.success) {
        toast.error(verifiedOTP.message);
        setIsLoading(false);
        return;
      }

      if (verifiedOTP.success) {
        toast.message(verifiedOTP.message);
        // Convert campDate to a string without the time part
        const campDateStr = new Date(params.campDate)
          .toISOString()
          .split("T")[0];

        // Append the start and end times to the campDateStr and convert them to date objects
        const campStartTime = new Date(
          `${campDateStr}T${params.campStartTime}:00Z`,
        );
        const campEndTime = new Date(
          `${campDateStr}T${params.campEndTime}:00Z`,
        );

        const registerUser = await registerCamp({
          ...params,
          campStartTime,
          campEndTime,
          confirmPassword: params.password,
        });
        if (!registerUser.success) {
          setIsLoading(false);
          toast.error(registerUser.message);
        }
        if (registerUser.success) {
          toast.success(registerUser.message);
          setUser({ ...registerUser.data.bloodbank });
          router.push("/camp");
        }
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-calculated w-screen flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-col gap-4 glass p-4 rounded-md border">
        <div>
          <h2 className="text-center text-lg font-light">Enter OTP sent to</h2>
          <p className="text-sm text-center tracking-wide">
            {params.organizerEmail}
          </p>
        </div>

        <Otp fieldLength={6} otp={otp} setOtp={setOtp} />

        <Button onClick={handleVerify} disabled={isLoading}>
          {isLoading && (
            <Image
              src={spinner}
              alt="spinner"
              width={20}
              height={20}
              className="mr-2 h-4 w-4 animate-spin"
            />
          )}
          Verify Email
        </Button>
      </div>
    </div>
  );
};

export default VerifyCampEmail;
