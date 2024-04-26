import { BoxesCore } from "@/components/Backgrounds/ColorBoxes/Boxes";
import FloatingBoxes from "@/components/Backgrounds/FloatingBoxes/FloatingBoxes";
import Loader from "@/components/Loader/Loader";
import About from "@/components/pages/About/About";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="sm:h-calculated sm:overflow-hidden">
      <FloatingBoxes />
      <Suspense fallback={<Loader />}>
        <About />
      </Suspense>
    </div>
  );
};

export default page;
