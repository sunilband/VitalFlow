"use client";
import React, { useEffect, useState } from "react";
import Otp from "./Otp";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  sendEmailOtp,
  sendPhoneOtp,
  verifyOtp,
} from "@/lib/apiCalls/donor/otpCalls";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { registerDoner } from "@/lib/apiCalls/donor/registerDoner";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import { Input } from "../../../../ui/input";
import Image from "next/image";
import spinner from "../../../../../public/svgs/spinner.svg";

type Props = {};

const VerifyUser = (props: Props) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneOrEmailInput, setPhoneOrEmailInput] = useState("");
  const [otp, setOtp] = React.useState("");
  const [selectedVerificationMethod, setSelectedverificationMethod] =
    useState("phone");

  let params: any = searchParams.get("values") || "";

  try {
    params = jwt.verify(params, "secret");
  } catch (error) {
    console.log("error", error);
  }

  useEffect(() => {
    if (!params) {
      return router.push("/donor/signup");
    }
  }, [params]);

  useEffect(() => {
    if (user) {
      router.push("/donor");
    }
  }, []);

  const handleVerify = async () => {
    console.log("params");
    try {
      const verifiedOTP = await verifyOtp({
        otp,
        phoneOrEmail: phoneOrEmailInput,
      });

      if (!verifiedOTP.success) {
        toast.error(
          verifiedOTP.message + " " + "& Please check OTP from Phone / Email",
        );
        return;
      }

      if (verifiedOTP.success) {
        toast.message(verifiedOTP.message);
        const registerUser = await registerDoner({
          ...params,
          ...(selectedVerificationMethod === "phone"
            ? { phone: phoneOrEmailInput }
            : { email: phoneOrEmailInput }),
        });
        if (!registerUser.success) {
          toast.error(registerUser.message);
        }
        if (registerUser.success) {
          toast.success("User Registered Successfully");
          console.log("registerUser", registerUser);
          setUser({ ...registerUser.data[0] });
          console.log("donor is", user);
          router.push("/donor");
        }
      }
    } catch (error) {}
  };

  const handleSendOtp = async () => {
    try {
      if (selectedVerificationMethod == "phone") {
        if (
          phoneOrEmailInput.length !== 10 ||
          isNaN(Number(phoneOrEmailInput))
        ) {
          toast.error("Invalid Phone Number");
          return;
        }
        const response = await sendPhoneOtp({ phone: phoneOrEmailInput });
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        if (response.success) {
          setOtpSent(true);
          toast.success(response.message);
        }
      }

      if (selectedVerificationMethod == "email") {
        // regex check email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(phoneOrEmailInput)) {
          toast.error("Invalid Email");
          return;
        }
        const response = await sendEmailOtp({ email: phoneOrEmailInput });
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        if (response.success) {
          setOtpSent(true);
          toast.success(response.message);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="h-calculated w-screen flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-col gap-4 glass p-4 rounded-md border">
        <div className=" flex flex-col gap-2 justify-center items-center">
          {otpSent && (
            <p className="text-center text-lg font-light">
              OTP were sent to your {selectedVerificationMethod}
            </p>
          )}
          {!otpSent && (
            <Tabs
              defaultValue="phone"
              onValueChange={(e) => {
                setSelectedverificationMethod(e);
              }}
              className="w-96 flex justify-center"
            >
              <div>
                <p className="text-center font-light mb-2">
                  Verify account using{" "}
                </p>
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
          )}
        </div>
        {!otpSent && (
          <Input
            placeholder={
              selectedVerificationMethod == "phone"
                ? "Enter Phone"
                : "Enter Email"
            }
            type={selectedVerificationMethod == "phone" ? "text" : "email"}
            required
            value={phoneOrEmailInput}
            onChange={(e) => {
              setPhoneOrEmailInput(e.target.value);
            }}
          />
        )}
        {otpSent && <Otp fieldLength={6} otp={otp} setOtp={setOtp} />}

        <Button onClick={otpSent ? handleVerify : handleSendOtp}>
          {isLoading && (
            <Image
              src={spinner}
              alt="spinner"
              width={20}
              height={20}
              className="mr-2 h-4 w-4 animate-spin"
            />
          )}
          {otpSent ? "Verify" : "Send OTP"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyUser;
