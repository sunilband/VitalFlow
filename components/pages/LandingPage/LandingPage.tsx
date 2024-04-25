"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Navbar/icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {};

const LandingPage = (props: Props) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", damping: 10 }}
      exit={{ opacity: 0, y: 20 }}
      className="z-50"
    >
      <PageHeader>
        <PageHeaderHeading className="dark:text-[#E11D48] tracking-widest">
          Vital~Flow
        </PageHeaderHeading>
        <PageHeaderDescription>
          The next generation of blood donation management and tracking system.
        </PageHeaderDescription>
        <PageActions>
          <Button>Get Started</Button>
          <Button
            variant="secondary"
            onClick={() =>
              router.push("https://github.com/sunilband?tab=repositories")
            }
          >
            <Icons.gitHub className="h-4 w-4 mr-2" />
            Github
          </Button>
        </PageActions>
      </PageHeader>
    </motion.div>
  );
};

export default LandingPage;
