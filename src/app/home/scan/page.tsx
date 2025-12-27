import UrlInput from "@/components/UrlInput";

export default function ScanPage() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-[10%] left-[15%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <section className="w-full max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Scan a Website
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Analyze a website for scam or phishing risks using 
            <span className="text-foreground font-medium"> explainable AI </span> 
            and transparent security checks.
          </p>
        </div>

        {/* Scan Card Container */}
        <div
          className="
            relative
            group
            rounded-3xl
            border border-white/20 dark:border-white/10
            bg-white/40 dark:bg-black/40
            backdrop-blur-2xl
            p-1 md:p-2
            shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            transition-all duration-300
            hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]
          "
        >
          <div className="p-6 md:p-10">
            <UrlInput />

            <div className="mt-8 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-muted/30 w-fit mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                TrustLens AI Security Node Active
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-xs text-muted-foreground/60 text-center max-w-md mx-auto leading-loose">
          TrustLens AI provides risk analysis and education to help users 
          make informed decisions. We do not block access to content.
        </p>
      </section>
    </div>
  );
}