import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const linkclass =
  "hover:text-[#E11D48] cursor-pointer hover:translate-x-1 transition-all duration-200 ease-in-out hover:underline";
export const BloodAvailability = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="border absolute p-2 py-4 font-medium rounded-md flex flex-col gap-3 w-44 top-11 -left-2"
    >
      <Link href="/docs/components">
        <p className={linkclass}>Blood Availablity</p>
      </Link>

      <Link href="/docs/components">
        <p className={linkclass}>Blood Bank Directory</p>
      </Link>
    </motion.div>
  );
};

export const DonateBlood = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="border absolute p-2 py-4 font-medium rounded-md flex flex-col gap-3 w-44 top-11 -left-2"
    >
      <Link href="/docs/components">
        <p className={linkclass}>Blood Donation Camps</p>
      </Link>

      <Link href="/docs/components">
        <p className={linkclass}>Donor Login</p>
      </Link>

      <Link href="/docs/components">
        <p className={linkclass}>Camp Admin Login</p>
      </Link>

      <Link href="/docs/components">
        <p className={linkclass}>About Blood Donation</p>
      </Link>

      <Link href="/docs/components">
        <p className={linkclass}>Register VBD Camp</p>
      </Link>
    </motion.div>
  );
};
