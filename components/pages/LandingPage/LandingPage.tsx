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

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Vital~Flow</PageHeaderHeading>
        <PageHeaderDescription>
          The next generation of blood donation management and tracking system.
        </PageHeaderDescription>
        <PageActions>
          <Button>Get Started</Button>
          <Button variant="secondary">
            <Icons.gitHub className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        </PageActions>
      </PageHeader>
    </div>
  );
};

export default LandingPage;
