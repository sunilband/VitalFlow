"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import spinner from "../../../../public/svgs/spinner.svg";
import { superAdminLogin } from "@/lib/apiCalls/superadmin/superAdminLogin";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const SuperAdminLogin = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log(values);
      try {
        const data = await superAdminLogin({ ...values });
        if (data.success) {
          console.log(data);
          toast.success(data.message);
          setIsLoading(false);
          router.push("/superadmin");
        } else {
          toast.error(data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-calculated">
      <Card className="w-full max-w-sm drop-shadow-2xl">
        <form onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Super Admin Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} className="w-full">
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
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SuperAdminLogin;
