function Features() {
  return (
    <div className="glass rounded-xl p-6 space-y-3 text-sm text-gray-300">
      <h3 className="text-sm font-medium text-white">
        ✅ Live Features
      </h3>

      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-green-400">✔</span>
          AI-powered URL and image scanning
        </li>

        <li className="flex items-center gap-2">
          <span className="text-green-400">✔</span>
          Community scan feed with trending threats
        </li>

        <li className="flex items-center gap-2">
          <span className="text-green-400">✔</span>
          Anonymous and authenticated reporting
        </li>

        <li className="flex items-center gap-2">
          <span className="text-green-400">✔</span>
          Learning hub with real scam examples
        </li>
      </ul>
    </div>
  );
}

export default Features;
