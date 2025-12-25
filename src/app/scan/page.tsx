import UrlInput from "@/components/UrlInput";

export default function ScanPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Scan a Website</h2>

      <p className="text-gray-600">
        Enter a website URL to analyze potential scam or phishing risks.
      </p>

      <UrlInput />
    </section>
  );
}
