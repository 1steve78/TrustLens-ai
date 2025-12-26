import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
export default function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <FlickeringGrid
        className="absolute inset-0 -z-10"
        squareSize={4}
        gridGap={6}
        flickerChance={0.3}
        color="rgb(100, 100, 100)"
        maxOpacity={0.15}
      />
      <div className="text-center space-y-8 px-4">

        {/* Small pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300 border border-white/10">
          ✨ New Background
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
          Smooth gradients make <br />
          <span className="text-white">everything better</span>
        </h1>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/scan"
            className="
              rounded-full
              bg-white text-black
              px-8 py-3
              font-medium
              transition hover:scale-105
            "
          >
            Scan
          </Link>

          {/* <Link
            href="/learn-more"
            className="
              rounded-full
              bg-white/10 text-white
              px-8 py-3
              font-medium
              border border-white/10
              transition hover:bg-white/20
            "
          >
            Learn More
          </Link> */}
        </div>
      </div>
    </section>
  );
}
