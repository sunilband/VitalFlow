import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
type Props = {
  data: any;
  setViewDataModelVisible: (visible: boolean) => void;
  setViewDonationModelVisible: (visible: boolean) => void;
};
import { Separator } from "@/components/ui/separator";

const ViewDonorModel = ({
  data,
  setViewDataModelVisible,
  setViewDonationModelVisible,
}: Props) => {
  useEffect(() => {
    setViewDonationModelVisible(false);
  }, []);

  return (
    <div className="flex justify-center items-center z-[100] p-4 relative mx-auto drop-shadow-2xl mt-28 sm:mt-0">
      <MdCancel
        className="absolute right-6 top-6 w-5 h-5 cursor-pointer"
        onClick={() => {
          setViewDataModelVisible(false);
        }}
      />

      <div className="bg-slate-50 dark:bg-black dark:text-white p-4 rounded-md max-h-[30rem] overflow-auto">
        <h2 className="text-xl">{data.fullName}</h2>
        <Separator className="mb-4 mt-1" />
        <p>Date of Birth: {new Date(data.dob).toLocaleDateString()}</p>
        <p>Weight: {data.weight}</p>
        <p>Gender: {data.gender}</p>
        <p>Blood Group: {data.bloodGroup}</p>
        <p>Email: {data.email}</p>
        <p>Email Verified: {data.emailVerified ? "Yes" : "No"}</p>
        <p>Phone Verified: {data.phoneVerified ? "Yes" : "No"}</p>
        <p>
          Address: {data.address.addressLine1}, {data.address.addressLine2},{" "}
          {data.address.city}, {data.address.state}, {data.address.pincode}
        </p>
        <p>Age: {data.age}</p>
        <p>Created At: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>Updated At: {new Date(data.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ViewDonorModel;
