"use client";
import React, { useEffect, useState } from "react";
import Otp from "../DonorSignup/VerifyUser.tsx/Otp";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendDonorLoginOTP } from "@/lib/apiCalls/donor/sendDonorLoginOTP";
import { donorLogin } from "@/lib/apiCalls/donor/verifyDonorLoginOTP";
import spinner from "../../../../public/svgs/spinner.svg";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {};

const DonerLogin = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [selectedVerificationMethod, setSelectedverificationMethod] =
    useState("phone");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const initialValues = {
    phone: "",
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits long"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {},
  });

  const handleSendOTP = async () => {
    setIsLoading(true);
    if (selectedVerificationMethod == "phone") {
      if (formik.errors.phone) {
        toast.error(formik.errors.phone);
        setIsLoading(false);
        return;
      }
    }

    if (selectedVerificationMethod == "email") {
      if (formik.errors.email) {
        toast.error(formik.errors.email);
        setIsLoading(false);
        return;
      }
    }

    try {
      if (selectedVerificationMethod == "phone") {
        const data = await sendDonorLoginOTP({ phone: formik.values.phone });
        if (!data.success) {
          toast.error(data.message);
          setIsLoading(false);
          return;
        }
        toast.success("OTP sent to your phone");
        setIsLoading(false);
        setIsOtpSent(true);
      }

      if (selectedVerificationMethod == "email") {
        const data = await sendDonorLoginOTP({ email: formik.values.email });
        if (!data.success) {
          toast.error(data.message);
          setIsLoading(false);
          return;
        }
        toast.success("OTP sent to your email");
        setIsLoading(false);
        setIsOtpSent(true);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    if (otp.length !== 6) {
      toast.error("Invalid OTP");
      return;
    }
    try {
      const data =
        selectedVerificationMethod == "phone"
          ? await donorLogin({ phone: formik.values.phone, otp })
          : await donorLogin({ email: formik.values.email, otp });
      if (!data.success) {
        toast.error(data.message);
        setIsLoading(false);
        return;
      }
      toast.success("Login successful");
      router.push("/donor");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong while verifying OTP");
      console.log(error);
    }
  };

  return (
    <div className="h-calculated w-screen flex justify-center items-center px-2">
      <>
        {!isOtpSent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center flex-col gap-4 glass p-4 rounded-md border w-96"
          >
            <div className=" flex flex-col gap-2 justify-center items-center w-full">
              <p className="text-center text-lg font-light tracking-widest">
                LOGIN
              </p>
              <Tabs
                defaultValue="phone"
                onValueChange={(e) => {
                  setSelectedverificationMethod(e);
                }}
              >
                <div>
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
            <Input
              type={selectedVerificationMethod == "phone" ? "text" : "email"}
              placeholder={
                selectedVerificationMethod == "phone" ? "Phone" : "Email"
              }
              className="w-full"
              id={selectedVerificationMethod == "phone" ? "phone" : "email"}
              // name={selectedVerificationMethod == "phone" ? "phone" : "email"}
              {...formik.getFieldProps(
                selectedVerificationMethod == "phone" ? "phone" : "email",
              )}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Already have an account ?
                </span>
              </div>
            </div>
            <Button
              onClick={handleSendOTP}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && (
                <Image
                  src={spinner}
                  alt="spinner"
                  width={20}
                  height={20}
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              Send OTP
            </Button>
          </motion.div>
        )}
        {/* ---------------------------------------------------------- */}
        {isOtpSent && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center flex-col gap-4 glass p-4 rounded-md border w-96"
          >
            <p className="text-center font-light">
              Verify OTP sent to{" "}
              {selectedVerificationMethod == "phone"
                ? formik.values.phone
                : formik.values.email}
            </p>
            <Otp otp={otp} setOtp={setOtp} fieldLength={6} />
            <Button
              onClick={handleVerifyOTP}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && (
                <Image
                  src={spinner}
                  alt="spinner"
                  width={20}
                  height={20}
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              Login
            </Button>
          </motion.div>
        )}
      </>
    </div>
  );
};

export default DonerLogin;
