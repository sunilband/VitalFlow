import { BoxesCore } from "@/components/Backgrounds/ColorBoxes/Boxes";
import FloatingBoxes from "@/components/Backgrounds/FloatingBoxes/FloatingBoxes";
import About from "@/components/pages/About/About";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="sm:h-calculated sm:overflow-hidden">
      <FloatingBoxes />
      <About />
    </div>
  );
};

export default page;
