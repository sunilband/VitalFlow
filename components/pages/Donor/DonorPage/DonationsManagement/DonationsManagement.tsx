"use client";
import { getSelfDonations } from "@/lib/apiCalls/donor/getSelfDonations";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import DonationsTable from "./DonationsTable";

type Props = {};

const DonationsManagement = (props: Props) => {
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    try {
      getSelfDonations().then((data) => {
        if (data.success) {
          const mappedData = data.data.map((donation: any) => ({
            "Donation ID": donation._id,
            "Donation Date": new Date(
              donation.donationTime,
            ).toLocaleDateString(),
            "Donation Type": donation.componentDetails.componentType,
            "Donation Status":
              donation.recipients.length > 0 ? "Fulfilled" : "Pending",
            "Donation Quantity": donation.componentDetails.componentQuantity,
          }));
          setDonations(mappedData);
        } else {
          toast.error(data.message);
          console.log(data.message);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  return (
    <div>
      <DonationsTable
        data={donations}
        columns={[
          "Donation ID",
          "Donation Date",
          "Donation Type",
          "Donation Status",
          "Donation Quantity",
        ]}
      />
    </div>
  );
};

export default DonationsManagement;
