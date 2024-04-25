"use client";
import React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExtractComponents from "./ExtractComponents/ExtractComponents";
import AssignRecipient from "./AssignRecipient/AssignRecipient";

type Props = {};

const DonationManagement = (props: Props) => {
  return (
    <div className="z-[100] cursor-auto">
      {" "}
      <Tabs defaultValue="Extract Components" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Extract Components">
            Extract Components
          </TabsTrigger>
          <TabsTrigger value="Assign Recipient">Assign Recipient</TabsTrigger>
        </TabsList>

        <TabsContent value="Extract Components">
          <ExtractComponents />
        </TabsContent>

        <TabsContent value="Assign Recipient">
          <AssignRecipient />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonationManagement;
