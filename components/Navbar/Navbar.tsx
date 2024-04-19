"use client";
import Link from "next/link";
import { siteConfig } from "./config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "./command-menu";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "../ui/button";
import { useUser } from "@/contexts/userContext";
import { useEffect } from "react";
import { logoutDonor } from "@/lib/apiCalls/donor/logoutDonor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const data = await logoutDonor();
    if (data.success) {
      setUser(undefined);
      router.push("/");
    }
    if (!data.success) {
      toast.error(data.message);
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 glass">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
            {user && (
              <Button onClick={handleLogout} className="ml-1">
                Logout
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
