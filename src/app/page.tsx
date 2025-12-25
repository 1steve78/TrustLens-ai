import Link from "next/link";

export default function HomePage() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl font-bold">
        Detect Scams. <span className="text-blue-600">Understand Risk.</span>
      </h1>

      <p className="text-gray-600 max-w-2xl mx-auto">
        TrustLens AI analyzes suspicious websites and explains why they may be risky,
        helping users stay safe and informed online.
      </p>

      <Link
        href="/scan"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
      >
        Scan a Website
      </Link>
    </section>
  );
}
