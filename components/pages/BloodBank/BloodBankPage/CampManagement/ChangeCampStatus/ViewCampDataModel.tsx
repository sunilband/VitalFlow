import React from "react";
import { MdCancel } from "react-icons/md";
type Props = {
  data: any;
  setViewDataModelVisible: (visible: boolean) => void;
};
import { Separator } from "@/components/ui/separator";

const ViewCampDataModel = ({ data, setViewDataModelVisible }: Props) => {
  return (
    <div className="flex justify-center items-center z-[100] p-4 relative mx-auto drop-shadow-2xl mt-28 sm:mt-0">
      <MdCancel
        className="absolute right-6 top-6 w-5 h-5 cursor-pointer"
        onClick={() => {
          setViewDataModelVisible(false);
        }}
      />

      <div className="bg-slate-50 dark:bg-black dark:text-white p-4 rounded-md max-h-[30rem] overflow-auto">
        <h2 className="text-xl">{data.campName}</h2>
        <Separator className="mb-4 mt-1" />
        <p>Organization Name: {data.organizationName}</p>
        <p>Organization Type: {data.organizationType}</p>
        <p>Organizer Name: {data.organizerName}</p>
        <p>Organizer Mobile Number: {data.organizerMobileNumber}</p>
        <p>Organizer Email: {data.organizerEmail}</p>
        <p>Co-Organizer Name: {data.coOrganizerName}</p>
        <p>Co-Organizer Mobile Number: {data.coOrganizerMobileNumber}</p>
        <p>
          Address: {data.address.addressLine1}, {data.address.addressLine2},{" "}
          {data.address.city}, {data.address.state}, {data.address.pincode}
        </p>
        <p>Camp Date: {new Date(data.campDate).toLocaleDateString()}</p>
        <p>Camp Start Time: {new Date(data.campStartTime).toLocaleString()}</p>
        <p>Camp End Time: {new Date(data.campEndTime).toLocaleString()}</p>
        <p>Estimated Participants: {data.estimatedParticipants}</p>
        <p>Supporter: {data.supporter}</p>
        <p>Remarks: {data.remarks}</p>
        <p>Status: {data.status}</p>
        <p>Created At: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>Updated At: {new Date(data.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ViewCampDataModel;
