export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen w-full px-6 py-20
                        bg-gradient-to-br from-black via-slate-950 to-black">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">
            Your privacy matters. This page explains how TrustLens handles your data.
          </p>
        </header>

        {/* Content Card */}
        <div className="glass rounded-3xl p-8 md:p-10 space-y-8 text-gray-300 leading-relaxed">

          <Section title="Information We Collect">
            Account details, submitted content for scanning, usage metrics,
            and limited device information for security and performance.
          </Section>

          <Section title="How We Use Data">
            Data is used strictly for security analysis, platform improvement,
            abuse prevention, and essential communication.
          </Section>

          <Section title="Media & Scan Data">
            Uploaded files are processed securely and are never shared publicly.
            Temporary storage may be used for analysis.
          </Section>

          <Section title="Cookies & Tracking">
            Only essential cookies are used for authentication and security.
          </Section>

          <Section title="Data Security">
            We use encryption, access controls, and monitoring to protect data.
          </Section>

          <Section title="Your Rights">
            You may request access, correction, or deletion of your data.
          </Section>

          <Section title="Contact">
            Email us at <span className="text-blue-400">mdyalam547@gmail.com</span>
          </Section>

        </div>

      </div>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium text-white">
        {title}
      </h2>
      <p className="text-sm text-gray-400">
        {children}
      </p>
    </div>
  );
}
