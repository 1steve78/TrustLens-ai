import Link from "next/link";


export default function HomePage() {
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
                SecureScan
              </p>
              <p className="text-xs text-gray-400">
                Your gateway for safer digital interaction.
              </p>
            </div>
          </div>

         
        </div>

        {/* Main hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Scan, Protect & <br /> Connect Securely
            </h1>

            <p className="text-gray-400 max-w-md">
              Our platform provides cutting-edge security scans, helps you
              track digital history, and manage your online profile with ease.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/auth"
                className="rounded-full bg-blue-500 px-8 py-3 text-sm font-medium hover:bg-blue-600 transition"
              >
                Login / Signup
              </Link>

              <button
                type="button"
                className="rounded-full px-6 py-3 text-sm text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Learn More
              </button>

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

        {/* Footer */}
        <div className="mt-16 flex flex-wrap gap-6 text-xs text-gray-400">
          <Link
            href="#"
            className="text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full"
          >
            About Us
          </Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </section>
  );
}
