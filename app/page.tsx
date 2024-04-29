import { AuroraBackground } from "@/components/Backgrounds/Aurora.tsx/AuroraBackground";
import Loader from "@/components/Loader/Loader";
import LandingPage from "@/components/pages/LandingPage/LandingPage";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="h-calculated overflow-hidden">
      <AuroraBackground>
        <Suspense fallback={<Loader />}>
          <LandingPage />
        </Suspense>
      </AuroraBackground>
    </main>
  );
}
