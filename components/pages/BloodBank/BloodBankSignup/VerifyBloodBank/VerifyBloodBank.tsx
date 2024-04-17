"use client";
import React, { useEffect, useState } from "react";
import Otp from "./Otp";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { verifyRegisterEmailOtp } from "@/lib/apiCalls/bloodbank/verifyRegisterEmailOtp";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { registerBloodBank } from "@/lib/apiCalls/bloodbank/registerBloodBank";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
// import { usebloodbank } from "@/contexts/bloodbankContext";
import { Input } from "../../../../ui/input";
import Image from "next/image";
import spinner from "../../../../../public/svgs/spinner.svg";
import { set } from "date-fns";

type Props = {};

const VerifyBloodBank = (props: Props) => {
  const router = useRouter();
  // const { bloodbank, setbloodbank } = usebloodbank();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = React.useState("");

  let params: any = searchParams.get("values") || "";

  try {
    params = jwt.verify(params, "secret");
  } catch (error) {
    console.log("error", error);
  }

  useEffect(() => {
    if (!params) {
      return router.push("/bloodbank/signup");
    }
  }, [params]);

  // useEffect(() => {
  //   if (bloodbank) {
  //     router.push("/bloodbank");
  //   }
  // }, []);

  const handleVerify = async () => {
    setIsLoading(true);
    console.log("params");
    try {
      const verifiedOTP = await verifyRegisterEmailOtp({
        otp,
        email: params.email,
      });

      if (!verifiedOTP.success) {
        toast.error(verifiedOTP.message);
        setIsLoading(false);
        return;
      }

      if (verifiedOTP.success) {
        toast.message(verifiedOTP.message);
        const registerUser = await registerBloodBank({
          ...params,
          confirmPassword: params.password,
        });
        if (!registerUser.success) {
          setIsLoading(false);
          toast.error(registerUser.message);
        }
        if (registerUser.success) {
          toast.success(registerUser.message);
          console.log("registerUser", registerUser);
          // setbloodbank({ ...registerUser.data[0] });
          // console.log("bloodbank is", bloodbank);
          // router.push("/bloodbank");
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
          <h2 className="text-center text-lg font-light">Verify Email</h2>
          <p className="text-sm text-center tracking-wide">{params.email}</p>
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

export default VerifyBloodBank;
