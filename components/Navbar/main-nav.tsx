"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "./config/site";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { docsConfig } from "./config/docs";
import { useEffect, useRef } from "react";

export function MainNav() {
  const pathname = usePathname();
  const [modelVisible, setModelVisible] = React.useState("");

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

  const linkclass =
    "hover:text-[#E11D48] cursor-pointer hover:translate-x-[2px] transition-all duration-200 ease-in-out ";

  //custom hook to close dropdown on click outside
  const useClickOutside = (ref: React.RefObject<any>, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  const navRef = useRef(null);
  useClickOutside(navRef, () => setModelVisible(""));

  return (
    <AnimatePresence>
      <div className="mr-4 hidden md:flex">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </motion.div>

        <nav className="flex items-center gap-6 text-sm">
          <motion.span
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
          >
            <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/about"
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              About us
            </Link>
          </motion.span>

          {Object.entries(groupedItems).map(([label, items], index) => (
            <motion.span
              key={label}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1 * index } }}
              className={cn(
                "transition-colors hover:text-foreground/80 relative cursor-pointer",
                pathname?.startsWith("/docs/components")
                  ? "text-foreground"
                  : "text-foreground/60",
                modelVisible == label && "text-foreground",
              )}
              onClick={() => {
                setModelVisible((prev) => (prev == label ? "" : label));
              }}
            >
              {label}
              {modelVisible == label && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="border absolute p-2 py-4 font-medium rounded-md flex flex-col gap-3 w-44 top-11 -left-2 bg-white dark:bg-black drop-shadow-lg"
                  ref={navRef}
                >
                  {items.map((item) => (
                    <Link key={item.title} href={item.href}>
                      <p className={linkclass}>{item.title}</p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </motion.span>
          ))}
        </nav>
      </div>
    </AnimatePresence>
  );
}
