import Link from "next/link";
import { cookies } from "next/headers";
import CTAButton from "../components/CtaButton";

export default async function HomePage() {
  // ✅ SERVER-SIDE auth check (reliable)
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("auth_token"));

  return (
    <section className="w-full max-w-6xl">
      <div className="glass glow-blue rounded-3xl p-12 md:p-14 relative overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-blue-500/20 flex items-center justify-center">
              🛡
            </div>
            <div>
              <p className="font-semibold text-blue-400 leading-none">
                TrustLens
              </p>
              <p className="text-xs text-gray-400">
                Your gateway for safer digital interaction.
              </p>
            </div>
          </div>
        </div>

        {/* Main hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Scan, Protect & <br /> Connect Securely
            </h1>

            <p className="text-gray-400 max-w-md">
              Our platform provides cutting-edge security scans, helps you
              track digital history, and manage your online profile with ease.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <CTAButton isLoggedIn={isLoggedIn} />

              <Link
                href="/learn-more"
                className="inline-block rounded-full px-6 py-3 text-sm text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden md:flex justify-center">
            <div className="relative h-80 w-48 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              QR PHONE
              <div className="absolute inset-0 rounded-2xl blur-xl bg-blue-500/20 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
