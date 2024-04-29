"use client";
import * as React from "react";

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
import { assignRecipient } from "@/lib/apiCalls/bloodbank/assignRecipient";
import { getAllDonors } from "@/lib/apiCalls/bloodbank/getAllDonors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Regex } from "lucide-react";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  donation: any;
};

const AssignDonationModel = ({ visible, setVisible, donation }: Props) => {
  interface Component {
    component: string;
    quantity: number;
  }
  const possibleComponents = [
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
  ];

  const [registeredRecipient, setRegisteredRecipient] =
    React.useState<boolean>(false);
  const [components, setComponents] = React.useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = React.useState<Component>({
    component: "",
    quantity: 0,
  });

  const [recipient, setRecipient] = React.useState<any>({});
  const handleAddComponent = async () => {};

  interface User {
    fullName: string;
    email: string;
    phone: string;
  }

  const [users, setUsers] = React.useState<User[]>([]);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address"),
      phone: Yup.string()
        .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number must be 10 digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  React.useEffect(() => {
    try {
      getAllDonors({ ...formik.values })
        .then((data) => {
          if (data.success) {
            setUsers(data.data.donors);
          } else {
            console.log(data.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [formik.values]);

  const handleFillData = (user: User) => {
    setRecipient(user);
  };

  const handleAssignComponent = async () => {
    const data = {
      registered: registeredRecipient,
      donationId: donation._id,
      recipientId: recipient._id,
      fullName: recipient.fullName,
      email: recipient.email ? recipient.email : null,
      phone: recipient.phone,
      componentGiven: selectedComponent.component,
      componentQuantityGiven: selectedComponent.quantity,
    };

    if (data.componentQuantityGiven <= 0) {
      toast.error("Component given quantity must be greater than 0");
      return;
    }

    // if (data.phone.length != 10) {
    //   toast.error("Phone number must be 10 digits");
    //   return;
    // }

    if (
      data.componentGiven == "" ||
      data.componentGiven == null ||
      data.componentGiven == undefined
    ) {
      toast.error("Please select a component to assign");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!registeredRecipient) {
      delete data.recipientId;
    }

    console.log(data);

    try {
      assignRecipient(data)
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            setVisible(false);
          } else {
            console.log(data.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="md:w-[500px] w-full ">
      <CardHeader>
        <CardTitle className="flex gap-2">Assign Recipient</CardTitle>
        <CardDescription className="flex gap-2">
          select a recipient for donation by
          <span className="font-semibold text-primary">
            {donation.donorId.fullName}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="recipient">Registered Recipient</Label>
              <Select
                value={registeredRecipient ? "Yes" : "No"}
                onValueChange={(e) => {
                  setRegisteredRecipient(e == "Yes" ? true : false);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {registeredRecipient && (
              <div className="flex flex-col gap-2">
                {/* filter section */}
                <Label htmlFor="filter">Filter Recipient</Label>
                <div className="flex gap-2">
                  <Input
                    id="fullName"
                    type="text"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Search Name"
                  />

                  <Input
                    id="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Search Email"
                  />

                  <Input
                    id="phone"
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Search Phone"
                  />
                </div>

                <div>
                  <Label>Select Recipient</Label>
                  <div className="flex flex-col space-y-1.5 h-32 overflow-auto border rounded p-2">
                    {users.map((user, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center px-2 py-1 bg-slate-100  dark:bg-slate-700 dark:text-black rounded"
                      >
                        <p className="w-10 text-sm font-normal">
                          {user.fullName}
                        </p>

                        <div className="flex flex-col gap-1">
                          <p className="text text-sm font-light">
                            {user.email}
                          </p>
                          <p className="text-sm font-light">{user.phone}</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleFillData(user)}
                          className="dark:text-white"
                        >
                          Assign
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Label htmlFor="recipient">Recipient Details</Label>
            <div className="flex gap-2">
              <Input
                id="recipient"
                disabled={registeredRecipient}
                type="text"
                value={recipient.fullName}
                onChange={(e) => {
                  console.log(e);
                  setRecipient({ ...recipient, fullName: e.target.value });
                }}
                placeholder="Name"
              />
              <Input
                id="email"
                type="email"
                disabled={registeredRecipient}
                value={recipient.email}
                onChange={(e) => {
                  setRecipient({ ...recipient, email: e.target.value });
                }}
                placeholder="Email"
              />

              <Input
                id="phone"
                type="text"
                disabled={registeredRecipient}
                value={recipient.phone}
                onChange={(e) => {
                  setRecipient({ ...recipient, phone: e.target.value });
                }}
                placeholder="Phone"
              />
            </div>
            <Label htmlFor="component">Select Component</Label>
            <Select
              value={selectedComponent.component}
              onValueChange={(e) => {
                setSelectedComponent({ ...selectedComponent, component: e });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Component" />
              </SelectTrigger>
              <SelectContent>
                {possibleComponents.map((component, index) => (
                  <SelectItem key={index} value={component}>
                    {component}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                id="quantity"
                type="number"
                value={selectedComponent.quantity}
                onChange={(e) => {
                  setSelectedComponent({
                    ...selectedComponent,
                    quantity: parseInt(e.target.value),
                  });
                }}
                placeholder="Quantity"
              />
            </div>
          </div>
        </section>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setVisible(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAssignComponent}>Assign</Button>
      </CardFooter>
    </Card>
  );
};

export default AssignDonationModel;
