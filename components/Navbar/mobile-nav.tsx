"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ViewVerticalIcon } from "@radix-ui/react-icons";

import { docsConfig } from "./config/docs";
import { siteConfig } from "./config/site";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const groupedItems: { [key: string]: any[] } = docsConfig.mainNav.reduce(
    (groups, item) => {
      if (item?.label) {
        if (!groups[item.label]) {
          groups[item.label] = [];
        }
        groups[item.label].push(item);
      }
      return groups;
    },
    {} as { [key: string]: any[] },
  ); // Add index signature to allow indexing with a string

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-0 pr-2">
          <div className="flex flex-col space-y-3">
            {Object.entries(groupedItems).map(([label, items]) => (
              <Accordion
                key={label}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={label}>
                  <AccordionTrigger>
                    <p className="tracking-widest uppercase">{label}</p>
                  </AccordionTrigger>
                  {(items as any[])?.map((item: any) => (
                    <AccordionContent key={item.href}>
                      <MobileLink href={item.href} onOpenChange={setOpen}>
                        {item.title}
                      </MobileLink>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
