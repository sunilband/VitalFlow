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
import AssignRecipientFilter from "./AssignRecipientFilter";
import AssignDonationModel from "./AssignDonationModel";
import { Separator } from "@/components/ui/separator";

export function AssignRecipient() {
  const columns = [
    {
      accessorKey: "donorId",
      header: "Donor",
      // @ts-ignore
      cell: ({ row }) => (
        <div className="capitalize">{row.original.donorId.fullName}</div>
      ),
    },
    {
      accessorKey: "componentQuantity",
      header: "Quantity",
      // @ts-ignore
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.componentDetails.componentQuantity} ml
        </div>
      ),
    },
    {
      accessorKey: "componentType",
      header: "Type",
      // @ts-ignore
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.componentDetails.componentType}
        </div>
      ),
    },
    {
      accessorKey: "extractedComponentsFromWholeBlood",
      header: "Extracted",
      // @ts-ignore
      cell: ({ row }) => (
        <div className="capitalize dark:text-black">
          {row.original.extractedComponentsFromWholeBlood ? (
            row.original.extractedComponentsFromWholeBlood.map(
              (component: any, key: any) => {
                return (
                  <div className="bg-slate-100 my-1 rounded p-1" key={key}>
                    <p className="text-sm">
                      {component.component}{" "}
                      <span className="text-primary dark:text-black">
                        {component.quantity}ml
                      </span>
                    </p>
                  </div>
                );
              },
            )
          ) : (
            <p>N/A</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "bloodGroup",
      header: "Blood Group",
      // @ts-ignore
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.componentDetails.bloodGroup}
        </div>
      ),
    },
    {
      accessorKey: "donationTime",
      header: "Donation Time",
      // @ts-ignore
      cell: ({ row }) => (
        <div className="capitalize ">
          {new Date(row.original.donationTime).toLocaleDateString()}
          <p className="text-sm font-light">
            {new Date(row.original.donationTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "recipients",
      header: "Recipients",
      // @ts-ignore
      cell: ({ row }) => (
        <div className="capitalize dark:text-black">
          {row.original.recipients ? (
            row.original.recipients.map((recipient: any, key: any) => {
              return (
                <div className="bg-slate-100 my-1 rounded p-1" key={key}>
                  <p className="text-sm">
                    {recipient.fullName} (
                    <span className="text-xs">{recipient.componentGiven}</span>{" "}
                    <span className="text-xs text-primary dark:text-black">
                      {recipient.componentQuantityGiven}ml)
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <p>N/A</p>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      // @ts-ignore
      cell: ({ row }) => {
        return (
          <Button onClick={() => handleAssign(row.original._id)}>Assign</Button>
        );
      },
    },
  ];

  const [data, setData] = React.useState([]);
  const [donationsFilter, setDonationsFilter] = React.useState({} as any);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [assignModelVisible, setAssignModelVisible] = React.useState(false);
  const [selectedDonation, setSelectedDonation] = React.useState({} as any);

  const handleAssign = (donationId: string) => {
    const donationData = data.find(
      (donation: any) => donation._id === donationId,
    );
    setSelectedDonation(donationData);
    setAssignModelVisible(true);
  };

  React.useEffect(() => {
    filterDonations({ ...donationsFilter })
      .then((data) => {
        if (data.success) {
          setData(data.data.donations);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [donationsFilter, assignModelVisible]);

  return (
    <div className="w-[400px] h-[750px] md:h-full sm:w-full">
      {assignModelVisible && (
        <AssignDonationModel
          visible={assignModelVisible}
          setVisible={setAssignModelVisible}
          donation={selectedDonation}
        />
      )}

      {!assignModelVisible && (
        <div className="w-full">
          <div>
            <AssignRecipientFilter
              donationsFilter={donationsFilter}
              setDonationsFilter={setDonationsFilter}
            />
          </div>
          <div className="rounded-md border glass">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                    <Separator />
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} total donations.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignRecipient;
