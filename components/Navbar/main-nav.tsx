"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "./config/site";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Badge } from "../ui/badge";
import { BloodAvailability, DonateBlood } from "./main-nav-models";
import { motion, AnimatePresence } from "framer-motion";

export function MainNav() {
  const pathname = usePathname();
  const [modelVisible, setModelVisible] = React.useState("");

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

          <motion.span
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className={cn(
              "transition-colors hover:text-foreground/80 relative cursor-pointer",
              pathname?.startsWith("/docs/components")
                ? "text-foreground"
                : "text-foreground/60",
              modelVisible == "lookingForBlood" && "text-foreground",
            )}
            onClick={() => {
              setModelVisible((prev) =>
                prev == "lookingForBlood" ? "" : "lookingForBlood",
              );
            }}
          >
            Looking for blood
            {modelVisible == "lookingForBlood" && <BloodAvailability />}
          </motion.span>

          <motion.span
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            className={cn(
              "transition-colors hover:text-foreground/80 relative cursor-pointer",
              pathname?.startsWith("/themes")
                ? "text-foreground"
                : "text-foreground/60",
              modelVisible == "donateBlood" && "text-foreground",
            )}
            onClick={() => {
              setModelVisible((prev) =>
                prev == "donateBlood" ? "" : "donateBlood",
              );
            }}
          >
            Want to donate blood
            {modelVisible == "donateBlood" && <DonateBlood />}
          </motion.span>
        </nav>
      </div>
    </AnimatePresence>
  );
}
