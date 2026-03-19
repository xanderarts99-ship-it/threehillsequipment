import Hero from "@/components/layout/Hero";
import MachineryGrid from "@/components/layout/MachineryGrid";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/layout/AboutSection";
import VideoSection from "@/components/layout/VideoSection";
import ContactSection from "@/components/layout/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <Hero />
      <AboutSection />
      <VideoSection />
      <MachineryGrid />
      <ContactSection />
      <Footer />
    </main>
  );
}
