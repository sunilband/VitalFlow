"use client";
import React from "react";
import { Boxes } from "./Boxes";
import { cn } from "@/lib/utils";

export function BackgroundBoxesDemo({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className=" w-screen max-h-screen relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="z-50">{children}</div>
    </div>
  );
}
