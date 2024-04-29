"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  getAllStates,
  getCities,
} from "@/lib/apiCalls/donor/getAllStatesAndCities";

interface CityStateContextType {
  allStates: any[];
  allCities: any[];
  updateCities: (stateName: string) => void;
}

const CityStateContext = createContext<CityStateContextType | undefined>(
  undefined,
);

export const CityStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allStates, setAllStates] = useState<any[]>([]);
  const [allCities, setAllCities] = useState<any[]>([]);

  useEffect(() => {
    getAllStates().then((data) => {
      setAllStates(data);
    });
  }, []);

  const updateCities = async (stateName: string) => {
    const selectedState = allStates?.find((state) => state.name === stateName);
    if (selectedState) {
      const citiesData = await getCities(selectedState?.iso2 || "MH");
      const filteredCities = citiesData.filter(
        (value: any, index: any, self: any) =>
          self.findIndex((t: any) => t.name === value.name) === index,
      );
      setAllCities(filteredCities);
    }
  };

  return (
    <CityStateContext.Provider value={{ allStates, allCities, updateCities }}>
      {children}
    </CityStateContext.Provider>
  );
};

export const useCityStateContext = () => {
  const context = useContext(CityStateContext);
  if (!context) {
    throw new Error(
      "useCityStateContext must be used within a CityStateProvider",
    );
  }
  return context;
};
