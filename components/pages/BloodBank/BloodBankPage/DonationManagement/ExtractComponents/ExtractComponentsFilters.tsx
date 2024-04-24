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

type Props = {
  donationsFilter: any;
  setDonationsFilter: any;
};

const ExtractComponentsFilters = ({
  donationsFilter,
  setDonationsFilter,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      donorFullName: "",
      bloodGroup: "",
      donationTime: "",
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

export default ExtractComponentsFilters;
