import Link from "next/link";
import { cookies } from "next/headers";
import CTAButton from "../components/CtaButton";
import Image from "next/image";
import {FeatureSlidingCards} from "../components/FeatureSlidingCard";
const FEATURES = [
  {
    title: "Deepfake Detection",
    desc: "Analyze images and videos to detect AI-generated or manipulated content.",
  },
  {
    title: "Private Media Protection",
    desc: "Secure sensitive images before they are misused or leaked.",
  },
  {
    title: "Threat Monitoring",
    desc: "Detect impersonation and identity abuse across platforms.",
  },
  {
    title: "Anonymous Reporting",
    desc: "Share issues safely without revealing your identity.",
  },
];

export default async function HomePage() {
  const cookieStore = cookies();
  const isLoggedIn = Boolean((await cookieStore).get("auth_token"));

  return (
    <section className="min-h-screen w-full px-6 py-20
                        bg-gradient-to-br from-black via-slate-950 to-black">

      <div className="w-full max-w-6xl mx-auto space-y-24">

        {/* ================= HERO ================= */}
        <div className="glass glow-blue rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-7">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Scan, Protect <br /> & Connect Securely
              </h1>

              <p className="text-gray-400 max-w-md text-sm md:text-base">
                Advanced security scans, digital history tracking,
                and profile management — all in one calm, secure place.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <CTAButton isLoggedIn={isLoggedIn} />

                <Link
                  href="/learn-more"
                  className="rounded-full px-6 py-3 text-sm text-gray-300
                             bg-white/5 border border-white/10
                             hover:bg-white/10 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden md:flex justify-center">
              <div
                className="relative h-96 w-56 rounded-3xl overflow-hidden
                           glass border border-blue-500/30"
              >
                <Image
                  src="/hero-visual.png"
                  alt="TrustLens preview"
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-black/20" />
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl
                             bg-blue-500/20 -z-10"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ================= FEATURES ================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium">
          Features
        </h2>

        <FeatureSlidingCards />
      </section>


        {/* ================= FOOTER CARD ================= */}
        <footer
          className="mt-24 glass rounded-3xl px-10 py-10
                    flex flex-col md:flex-row
                    items-center justify-between gap-6
                    border border-white/15
                    bg-black/40
                    relative"
        > 
          {/* subtle top glow */}
          <div
            className="absolute inset-x-10 -top-px h-px
                      bg-gradient-to-r from-transparent
                      via-blue-500/40 to-transparent"
          />

          <p className="text-sm glass-footer text-gray-400">
            © {new Date().getFullYear()} TrustLens AI · Digital Safety Platform
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="https://www.instagram.com/trust.lens_/" className="hover:text-white transition">
              Instagram
            </Link>
            <Link href="https://github.com/1steve78/TrustLens-ai" className="hover:text-white transition">
              GitHub
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
          </div>
        </footer>


      </div>
    </section>
  );
}
