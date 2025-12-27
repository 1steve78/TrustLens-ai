export default function RightPanel() {
  return (
    <aside className="space-y-4">

      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-sm font-medium mb-2">
          Learning Tip
        </h3>
        <p className="text-xs text-gray-400">
          Always double-check URL typos before clicking.
        </p>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-sm font-medium mb-2">
          Trending Scans
        </h3>
        <ul className="text-xs text-gray-400 space-y-2">
          <li>#PublicWiFi</li>
          <li>#FakeLogin</li>
          <li>#Phishing</li>
        </ul>
      </div>
    </aside>
  );
}
