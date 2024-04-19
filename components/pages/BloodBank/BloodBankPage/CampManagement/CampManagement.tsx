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
import AssignDonation from "./AssignRecipient/AssignDonation";
import ExtractComponents from "./ExtractComponents/ExtractComponents";
import ChangeCampStatus from "./ChangeCampStatus/ChangeCampStatus";

type Props = {};

const CampManagement = (props: Props) => {
  return <ChangeCampStatus />;
};

export default CampManagement;
