import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  LineChart,
  Settings,
  Users2,
  Landmark,
  BriefcaseMedical,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  selectedLink: string;
  setSelectedLink: (linkName: string) => void;
};

const Aside = ({ selectedLink, setSelectedLink }: Props) => {
  const handleLinkClick = (linkName: string) => {
    setSelectedLink(linkName);
  };

  return (
    <div className="h-calculated">
      <TooltipProvider>
        <aside className="fixed bottom-0 sm:top-[25%] top-14 left-0 z-10 w-full sm:w-14 sm:flex-col bg-background sm:flex mt-2">
          <nav className="flex sm:flex-col items-center justify-center gap-4 px-2 sm:py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("Dashboard")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    selectedLink === "Dashboard"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("Blood Banks")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    selectedLink === "Blood Banks"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Landmark className="h-5 w-5" />
                  <span className="sr-only">Blood Banks</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Blood Banks</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("Donation Camps")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    selectedLink === "Donation Camps"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <BriefcaseMedical className="h-5 w-5" />
                  <span className="sr-only">Donation Camps</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Donation Camps</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("Donors")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    selectedLink === "Donors"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Donors</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Donors</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("Analytics")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    selectedLink === "Analytics"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
            <div className="place-items-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    onClick={() => handleLinkClick("Settings")}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                      selectedLink === "Settings"
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </div>
          </nav>
        </aside>
      </TooltipProvider>
    </div>
  );
};

export default Aside;
