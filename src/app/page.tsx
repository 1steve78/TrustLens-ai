import Link from "next/link";
import { cookies } from "next/headers";
import CTAButton from "../components/CtaButton";
import Image from "next/image";

export default async function HomePage() {
  const cookieStore = cookies();
  const isLoggedIn = Boolean((await cookieStore).get("auth_token"));

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">

        {/* Glass Hero Card */}
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
              <div className="relative h-96 w-56 rounded-3xl overflow-hidden
                              glass border border-blue-500/30">

                {/* Image */}
                <Image
                  src="/hero-visual.png"
                  alt="TrustLens preview"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Optional glass tint overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl blur-2xl
                                bg-blue-500/20 -z-10" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
