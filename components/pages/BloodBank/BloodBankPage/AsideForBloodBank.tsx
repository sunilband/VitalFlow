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
import { IoChatboxEllipsesOutline } from "react-icons/io5";

type Props = {
  selectedLink: string;
  setSelectedLink: (linkName: string) => void;
};

const Aside = ({ selectedLink, setSelectedLink }: Props) => {
  const handleLinkClick = (linkName: string) => {
    setSelectedLink(linkName);
  };

  return (
    <>
      <TooltipProvider>
        <aside className="fixed bottom-0 sm:top-[25%] top-0 sm:left-0 left-1/2 right-1/2 sm:w-14 sm:flex-col sm:bg-background sm:border sm:ml-2 rounded-md h-fit sm:flex mt-2 light:glass z-[200] sm:z-10">
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
                  onClick={() => handleLinkClick("Donations")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    selectedLink === "Donations"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Donations</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Donations</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("Chat")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    selectedLink === "Chat"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <IoChatboxEllipsesOutline className="h-5 w-5" />
                  <span className="sr-only">Chat</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Chat</TooltipContent>
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
    </>
  );
};

export default Aside;
