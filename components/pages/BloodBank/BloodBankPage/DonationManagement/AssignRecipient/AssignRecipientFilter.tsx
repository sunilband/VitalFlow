"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDonations } from "@/lib/apiCalls/camp/getDonations";
import ViewBloodBankDataModel from "@/components/pages/SuperAdmin/SuperAdminPage/BloodBankAdminManagement/ViewBloodBankDataModel";
import ViewDonorModel from "../../../../Camp/CampPage/DonorManagement/ViewDonorModel";
import { filterDonations } from "@/lib/apiCalls/bloodbank/filterDonations";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsCalendar2Date } from "react-icons/bs";
import { Calendar } from "@/components/ui/calendar";
import { comma } from "postcss/lib/list";

type Props = {
  donationsFilter: any;
  setDonationsFilter: any;
};

const AssignRecipientFilters = ({
  donationsFilter,
  setDonationsFilter,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      donorFullName: "",
      bloodGroup: "",
      donationTime: "",
      componentType: "",
      extractedComponent: "",
    },
    validationSchema: Yup.object({
      donorFullName: Yup.string().required("Required"),
      bloodGroup: Yup.string()
        .oneOf(
          ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          "Invalid blood group",
        )
        .required("Required"),
      donationTime: Yup.date().required("Required"),
      componentType: Yup.string()
        .required("Required")
        .oneOf(
          [
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
          ],
          "Invalid component type",
        ),
      extractedComponent: Yup.string()
        .required("Required")
        .oneOf([
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
        ]),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  React.useEffect(() => {
    setDonationsFilter({ ...formik.values });
  }, [formik.values]);

  return (
    <div className="flex items-center justify-between py-4">
      <Input
        id="donorFullName"
        placeholder="Donor Name"
        {...formik.getFieldProps("donorFullName")}
        className="w-36 bg-background"
      />

      <Select
        {...formik.getFieldProps("bloodGroup")}
        value={formik.values.bloodGroup}
        onValueChange={(e) => {
          formik.setFieldValue("bloodGroup", e === "All" ? "" : e);
        }}
      >
        <SelectTrigger className="w-36 text-[#71717A]">
          <SelectValue placeholder={`Blood Group`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Blood Group</SelectLabel>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        {...formik.getFieldProps("componentType")}
        value={formik.values.componentType}
        onValueChange={(e) => {
          formik.setFieldValue("componentType", e === "All" ? "" : e);
        }}
      >
        <SelectTrigger className="w-36 text-[#71717A]">
          <SelectValue placeholder={`Type`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Component Type</SelectLabel>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Cryo Poor Plasma">Cryo Poor Plasma</SelectItem>
            <SelectItem value="Cryoprecipitate">Cryoprecipitate</SelectItem>
            <SelectItem value="Fresh Frozen Plasma">
              Fresh Frozen Plasma
            </SelectItem>
            <SelectItem value="Irradiated RBC">Irradiated RBC</SelectItem>
            <SelectItem value="Leukoreduced RBC">Leukoreduced RBC</SelectItem>
            <SelectItem value="Packed Red Blood Cells">
              Packed Red Blood Cells
            </SelectItem>
            <SelectItem value="Plasma">Plasma</SelectItem>
            <SelectItem value="Platelet Concentrate">
              Platelet Concentrate
            </SelectItem>
            <SelectItem value="Platelet Rich Plasma">
              Platelet Rich Plasma
            </SelectItem>
            <SelectItem value="Platelets additive solutions">
              Platelets additive solutions
            </SelectItem>
            <SelectItem value="Random Donor Platelets">
              Random Donor Platelets
            </SelectItem>
            <SelectItem value="Sagm Packed RBC">Sagm Packed RBC</SelectItem>
            <SelectItem value="Single Donor Plasma">
              Single Donor Plasma
            </SelectItem>
            <SelectItem value="Single Donor Platelet">
              Single Donor Platelet
            </SelectItem>
            <SelectItem value="Whole Blood">Whole Blood</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        {...formik.getFieldProps("extractedComponent")}
        value={formik.values.extractedComponent}
        onValueChange={(e) => {
          formik.setFieldValue("extractedComponent", e === "All" ? "" : e);
        }}
      >
        <SelectTrigger className="w-36 text-[#71717A]">
          <SelectValue placeholder={`Extracted`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Extracted Component</SelectLabel>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Cryo Poor Plasma">Cryo Poor Plasma</SelectItem>
            <SelectItem value="Cryoprecipitate">Cryoprecipitate</SelectItem>
            <SelectItem value="Fresh Frozen Plasma">
              Fresh Frozen Plasma
            </SelectItem>
            <SelectItem value="Irradiated RBC">Irradiated RBC</SelectItem>
            <SelectItem value="Leukoreduced RBC">Leukoreduced RBC</SelectItem>
            <SelectItem value="Packed Red Blood Cells">
              Packed Red Blood Cells
            </SelectItem>
            <SelectItem value="Plasma">Plasma</SelectItem>
            <SelectItem value="Platelet Concentrate">
              Platelet Concentrate
            </SelectItem>
            <SelectItem value="Platelet Rich Plasma">
              Platelet Rich Plasma
            </SelectItem>
            <SelectItem value="Platelets additive solutions">
              Platelets additive solutions
            </SelectItem>
            <SelectItem value="Random Donor Platelets">
              Random Donor Platelets
            </SelectItem>
            <SelectItem value="Sagm Packed RBC">Sagm Packed RBC</SelectItem>
            <SelectItem value="Single Donor Plasma">
              Single Donor Plasma
            </SelectItem>
            <SelectItem value="Single Donor Platelet">
              Single Donor Platelet
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-36 justify-start text-left font-normal"
          >
            <BsCalendar2Date className="mr-2" />
            {formik.values.donationTime ? (
              new Date(formik.values.donationTime).toLocaleDateString()
            ) : (
              <span>Donation Date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={new Date(formik.values.donationTime)}
            onSelect={(date) => formik.setFieldValue("donationTime", date)} // update the date when it is changed
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AssignRecipientFilters;
