"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import FrozenRoute from "./FrozenRoutes";

const PageAnimatePresence: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimatePresence;
