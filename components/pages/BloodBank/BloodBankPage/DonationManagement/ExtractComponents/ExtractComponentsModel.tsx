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
import { ExtractComponentsFromWholeBlood } from "@/lib/apiCalls/bloodbank/ExtractComponentsFromWholeBlood";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  donation: any;
};

const ExtractComponentsModel = ({ visible, setVisible, donation }: Props) => {
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
  const [components, setComponents] = React.useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = React.useState<Component>({
    component: "",
    quantity: 0,
  });

  const [remainingQuantity, setRemainingQuantity] = React.useState<number>(
    donation.componentDetails.componentQuantity,
  );

  const handleAddComponent = () => {
    if (selectedComponent.quantity > remainingQuantity) {
      toast.error("Quantity exceeds the remaining quantity");
      return;
    }
    // if the component is already added, update the quantity
    if (
      components.find(
        (component) => component.component === selectedComponent.component,
      )
    ) {
      const updatedComponents = components.map((component) => {
        if (component.component === selectedComponent.component) {
          return {
            ...component,
            quantity: component.quantity + selectedComponent.quantity,
          };
        }
        return component;
      });
      setComponents(updatedComponents);
      setSelectedComponent({ component: "", quantity: 0 });
      setRemainingQuantity(remainingQuantity - selectedComponent.quantity);
      return;
    }
    setComponents([...components, selectedComponent]);
    setSelectedComponent({ component: "", quantity: 0 });
    setRemainingQuantity(remainingQuantity - selectedComponent.quantity);
  };

  const handleRemoveComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
    setRemainingQuantity(remainingQuantity + components[index].quantity);
  };

  const handleExtract = () => {
    if (components.length === 0) {
      toast.error("Please extract at least one component");
      return;
    }
    try {
      ExtractComponentsFromWholeBlood({
        donationId: donation._id,
        extractedComponentsFromWholeBlood: components,
      })
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            setVisible(false);
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    //if extracted components are already present in donation.extractedComponentsFromWholeBlood, set them
    if (donation.extractedComponentsFromWholeBlood.length > 0) {
      setComponents(donation.extractedComponentsFromWholeBlood);
      const totalExtractedQuantity =
        donation.extractedComponentsFromWholeBlood.reduce(
          (acc: number, component: Component) => acc + component.quantity,
          0,
        );
      setRemainingQuantity(remainingQuantity - totalExtractedQuantity);
    }
  }, []);

  return (
    <Card className="md:w-[500px] w-full ">
      <CardHeader>
        <CardTitle className="flex gap-2">
          Remaining Quantity:{" "}
          <p className="font-semibold text-primary">{remainingQuantity} ml</p>
        </CardTitle>
        <CardDescription className="flex gap-2">
          Extract components from donation by{" "}
          <p className="font-semibold text-primary">
            {donation.donorId.fullName}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section>
          <div className="grid w-full items-center gap-4">
            {/* Selected Components and quantity */}
            <div>
              <Label>Selected Components</Label>
              <div className="flex flex-col space-y-1.5 h-20 overflow-auto border rounded p-2">
                {components.map((component, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-2 py-1 bg-slate-100  dark:bg-slate-700 dark:text-black rounded"
                  >
                    <p>{component.component}</p>
                    <p className="font-light">{component.quantity} ml</p>
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveComponent(index)}
                      className="dark:text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Component</Label>
              <Select
                value={selectedComponent.component}
                onValueChange={(e) => {
                  setSelectedComponent({
                    ...selectedComponent,
                    component: e,
                  });
                }}
              >
                <SelectTrigger className="w-full text-[#71717A]">
                  <SelectValue placeholder={`Select Component`} />
                </SelectTrigger>
                <SelectContent>
                  {possibleComponents.map((component) => (
                    <SelectItem key={component} value={component}>
                      {component}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="quantity">Quantity (ml)</Label>
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
              />

              <Button
                variant="secondary"
                className="rounded-none"
                onClick={handleAddComponent}
              >
                Add Component
              </Button>
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
        <Button onClick={handleExtract}>Update</Button>
      </CardFooter>
    </Card>
  );
};

export default ExtractComponentsModel;
