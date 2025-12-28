export default function ProjectsPage() {
  return (
    <section className="space-y-10">

      {/* Page title */}
      <header>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-gray-400 mt-1">
          A quick overview of what TrustLens is building.
        </p>
      </header>

      {/* Project 1 */}
      <ProjectCard
        title="TrustLens URL Analyzer"
        description="An AI-powered tool that analyzes URLs for phishing, scams, and malicious behavior using OpenRouter models."
        points={[
          "Uses OpenRouter AI models",
          "Detects phishing, fake logins, and suspicious links",
          "Stores scan history for community visibility",
        ]}
        status="Active"
      />

      {/* Project 2 */}
      <ProjectCard
        title="Community Scan Feed"
        description="A public feed where users can see scans performed by others and learn from real-world threats."
        points={[
          "Global community scan feed",
          "Anonymous and logged-in scans supported",
          "Helps users stay aware of trending threats",
        ]}
        status="Active"
      />

      {/* Project 3 */}
      <ProjectCard
        title="Learning Hub"
        description="Educational content focused on cybersecurity awareness and safe online practices."
        points={[
          "Short, focused learning modules",
          "Tracks what users are learning",
          "Feeds learning activity to the home page",
        ]}
        status="In Progress"
      />
    </section>
  );
}

/* ---------- COMPONENT ---------- */

function ProjectCard({
  title,
  description,
  points,
  status,
}: {
  title: string;
  description: string;
  points: string[];
  status: "Active" | "In Progress";
}) {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            status === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-400">
        {description}
      </p>

      <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
