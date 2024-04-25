"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./Card";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/Navbar/icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {};

const About = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-y-1 items-center justify-evenly">
      {/* Sunil Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: "spring", damping: 10 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <CardContainer className="inter-var z-50 group">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-2xl font-bold text-neutral-600 dark:text-white group-hover:text-[#E11D48]"
            >
              Sunil Band
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-1 dark:text-neutral-300"
            >
              Full Stack Developer
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/images/sunil.jpg"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                as={Link}
                href="https://sunilband.me"
                target="__blank"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Portfolio →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold flex"
                onClick={() => {
                  router.push("https://github.com/sunilband");
                }}
              >
                <Icons.gitHub className="h-4 w-4 mr-2" />
                Github
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: "spring", damping: 10 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {/* Anagha Card */}
        <CardContainer className="inter-var z-50 group">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-2xl font-bold text-neutral-600 dark:text-white group-hover:text-[#E11D48]"
            >
              Anagha Yawale
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-1 dark:text-neutral-300"
            >
              Flutter Developer / Figma Designer
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/images/anagha.jpg"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                as={Link}
                href="https://anagha.tech"
                target="__blank"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Portfolio →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold flex"
                onClick={() => {
                  router.push("https://github.com/anaghayawale");
                }}
              >
                <Icons.gitHub className="h-4 w-4 mr-2" />
                Github
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: "spring", damping: 10 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {/* Asmit Card */}
        <CardContainer className="inter-var z-50 group">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-2xl font-bold text-neutral-600 dark:text-white group-hover:text-[#E11D48]"
            >
              Asmit Suragond
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-1 dark:text-neutral-300"
            >
              PHP developer
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/images/asmit.jpeg"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                as={Link}
                href="https://www.linkedin.com/in/asmit-suragond-2389a01a2/?originalSubdomain=in"
                target="__blank"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Linkedin →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold flex"
                onClick={() => {
                  router.push("https://github.com/asmitsuragond15");
                }}
              >
                <Icons.gitHub className="h-4 w-4 mr-2" />
                Github
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </motion.div>
    </div>
  );
};

export default About;
