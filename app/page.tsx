import { AuroraBackground } from "@/components/Backgrounds/Aurora.tsx/AuroraBackground";
import LandingPage from "@/components/pages/LandingPage/LandingPage";

export default function Home() {
  return (
    <main className="h-calculated overflow-hidden">
      <AuroraBackground>
        <LandingPage />
      </AuroraBackground>
    </main>
  );
}
