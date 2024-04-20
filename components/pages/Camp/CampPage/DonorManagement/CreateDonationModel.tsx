import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
type Props = {
  data: any;
  setViewDataModelVisible: (visible: boolean) => void;
  setViewDonationModelVisible: (visible: boolean) => void;
};
import { Separator } from "@/components/ui/separator";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import spinner from "../../../../../public/svgs/spinner.svg";
import { createDonation } from "@/lib/apiCalls/camp/createDonation";

const componentsEnum = [
  "Cryo Poor Plasma",
  "Cryoprecipitate",
  "Fresh Frozen Plasma",
  "Irradiated RBC",
  "Leukoreduced RBC",
  "Packed Red Blood Cells",
  "Plasma",
  "Platelet Concentrate",
  "Platelet Rich Plasma",
  "Platelets additive solutions",
  "Random Donor Platelets",
  "Sagm Packed RBC",
  "Single Donor Plasma",
  "Single Donor Platelet",
  "Whole Blood",
];

const bloodbloodGroupEnum = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationModel = ({
  data,
  setViewDataModelVisible,
  setViewDonationModelVisible,
}: Props) => {
  useEffect(() => {
    setViewDataModelVisible(false);
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);

  const initialValues = {
    componentType: "Whole Blood",
    componentQuantity: "",
    bloodGroup: "",
  };

  const validationSchema = Yup.object({
    componentType: Yup.string()
      .oneOf(componentsEnum, "Invalid Component Type")
      .required("Component Type is Required"),
    componentQuantity: Yup.number()
      .min(50, "Quantity must be greater than 50")
      .required("Component Quantity is Required"),
    bloodGroup: Yup.string()
      .oneOf(bloodbloodGroupEnum, "Invalid Blood Group")
      .required("Blood Group is Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {},
  });

  const handleCreateDonation = async () => {
    try {
      const errors = await formik.validateForm();
      console.log("errors are", errors);
      if (Object.keys(errors).length > 0) {
        for (let error in errors) {
          // @ts-ignore
          toast.error(errors[error]);
          return;
        }
      }
      setIsLoading(true);

      const res = await createDonation({
        donorId: data._id,
        componentType: formik.values.componentType,
        componentQuantity: formik.values.componentQuantity,
        bloodGroup: formik.values.bloodGroup,
        type: "Donate",
      });
      if (res.success) {
        setIsLoading(false);
        toast.success("Donation Created Successfully");
        setViewDonationModelVisible(false);
      } else {
        setIsLoading(false);
        toast.error(res.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center z-[100] p-4 relative mx-auto drop-shadow-2xl mt-28 sm:mt-0">
      <MdCancel
        className="absolute right-6 top-6 w-5 h-5 cursor-pointer"
        onClick={() => {
          setViewDonationModelVisible(false);
        }}
      />

      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Donation</CardTitle>
            <CardDescription>
              Create a new donation for{" "}
              <p className="font-semibold tracking-wide">{data.fullName}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="componentQuantity">Quantity</Label>
                  <Input
                    id="componentQuantity"
                    type="number"
                    placeholder="Component Quantity"
                    {...formik.getFieldProps("componentQuantity")}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="componentType">Component Type</Label>
                  <Select
                    {...formik.getFieldProps("componentType")}
                    value={formik.values.componentType}
                    onValueChange={(e) =>
                      formik.setFieldValue("componentType", e)
                    }
                  >
                    <SelectTrigger id="componentType">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {componentsEnum.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    //  {...formik.getFieldProps("organizationType")}
                    //  value={formik.values.organizationType}
                    //  onValueChange={(e) =>
                    //    formik.setFieldValue("organizationType", e)
                    //  }
                    {...formik.getFieldProps("bloodGroup")}
                    value={formik.values.bloodGroup}
                    onValueChange={(e) => formik.setFieldValue("bloodGroup", e)}
                  >
                    <SelectTrigger id="bloodGroup">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {bloodbloodGroupEnum.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                disabled={isLoading}
                className="w-full mt-4"
                onClick={handleCreateDonation}
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
                Create Donation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDonationModel;
