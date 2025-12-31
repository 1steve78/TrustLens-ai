import Link from "next/link";
import { cookies } from "next/headers";
import CTAButton from "../components/CtaButton";

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("auth_token"));

  return (
    <section className="w-full flex items-center justify-center min-h-[calc(100vh-120px)  ]">
      <div className="w-full max-w-6xl mx-auto px-6">
        
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
                  className="rounded-full px-6 py-3 text-sm text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden md:flex justify-center">
              <div className="relative h-96 w-56 rounded-3xl glass border border-blue-500/30 flex items-center justify-center">
                <span className="text-blue-400 text-sm tracking-wide">
                  Secure Scan
                </span>

                <div className="absolute inset-0 rounded-3xl blur-2xl bg-blue-500/20 -z-10" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
