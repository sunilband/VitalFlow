"use client";
import { createContext, useContext, ReactNode, useState } from "react";

// Define the donor type
type Donor = {
  fullName: string;
  dob: {
    $date: string;
  };
  weight: number;
  gender: string;
  bloodGroup: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  phoneVerified: boolean;
  address: {
    addressType: string;
    addressLine1: string;
    addressLine2: string;
    state: string;
    city: string;
    pincode: number;
    longitude: number;
    latitude: number;
    _id: {
      $oid: string;
    };
    createdAt: {
      $date: string;
    };
    updatedAt: {
      $date: string;
    };
  };
  donationHistory: any[]; // You may define a specific type for donationHistory if needed
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  age: number;
  __v: number;
};

// Create a context and export the Provider and Consumer
const DonorContext = createContext<{
  donor?: Donor;
  setDonor: React.Dispatch<React.SetStateAction<Donor | undefined>>;
}>({ setDonor: () => {} });

// Define a custom hook to use the donor context
export const useDonor = () => {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error("useDonor must be used within a DonorProvider");
  }
  return context;
};

// Define a provider component to wrap your app with
type DonorProviderProps = {
  children: ReactNode;
};

export const DonorProvider: React.FC<DonorProviderProps> = ({ children }) => {
  const [donor, setDonor] = useState<Donor | undefined>(undefined);

  return (
    <DonorContext.Provider value={{ donor, setDonor }}>
      {children}
    </DonorContext.Provider>
  );
};
