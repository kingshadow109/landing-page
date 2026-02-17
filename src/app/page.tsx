import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div id="features">
        <Features />
      </div>
      <Footer />
    </main>
  );
}
