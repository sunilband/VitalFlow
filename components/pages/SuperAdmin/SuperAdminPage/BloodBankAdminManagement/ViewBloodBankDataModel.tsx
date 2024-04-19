import React from "react";
import { MdCancel } from "react-icons/md";
type Props = {
  data: any;
  setViewDataModelVisible: (visible: boolean) => void;
};
import { Separator } from "@/components/ui/separator";

const ViewBloodBankDataModel = ({ data, setViewDataModelVisible }: Props) => {
  return (
    <div className="flex justify-center items-center z-[100] p-4 relative mx-auto drop-shadow-2xl mt-28 sm:mt-0">
      <MdCancel
        className="absolute right-6 top-6 w-5 h-5 cursor-pointer"
        onClick={() => {
          setViewDataModelVisible(false);
        }}
      />

      <div className="bg-slate-50 dark:bg-black dark:text-white p-4 rounded-md max-h-[30rem] overflow-auto">
        <h2 className="text-xl">{data.name}</h2>
        <Separator className="mb-4 mt-1" />
        <p>Parent Hospital Name: {data.parentHospitalName}</p>
        <p>Category: {data.category}</p>
        <p>Contact Person: {data.contactPersonName}</p>
        <p>Contact Phone: {data.contactPersonPhone}</p>
        <p>Email: {data.email}</p>
        <p>License: {data.license}</p>
        <p>
          License Validity:{" "}
          {new Date(data.licenseValidity).toLocaleDateString()}
        </p>
        <p>
          Address: {data.address.addressLine1}, {data.address.addressLine2},{" "}
          {data.address.city}, {data.address.state}, {data.address.pincode}
        </p>
        <p>Website: {data.website}</p>
        <p>Component Facility: {data.componentFacility ? "Yes" : "No"}</p>
        <p>Apheresis Facility: {data.apheresisFacility ? "Yes" : "No"}</p>
        <p>Helpline Number: {data.helplineNumber}</p>
        <p>Remarks: {data.remarks}</p>
        <p>Status: {data.status}</p>
        <p>Created At: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>Updated At: {new Date(data.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ViewBloodBankDataModel;
