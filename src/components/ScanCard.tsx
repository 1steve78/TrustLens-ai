export default function ScanCard() {
  return (
    <div className="glass rounded-xl p-4 border border-blue-500/40">

      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-white/20" />
        <p className="text-sm text-gray-300">
          Alex from Tokyo ✅
        </p>
      </div>

      <div className="grid grid-cols-[120px_1fr_120px] gap-4 items-center">

        <div className="bg-white p-2 rounded">
          QR
        </div>

        <div>
          <p className="font-medium">
            Found a phishing link
          </p>
          <p className="text-xs text-gray-400">
            Scanned public Wi-Fi
          </p>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-white/10 rounded text-xs">
              Agree
            </button>
            <button className="px-3 py-1 bg-white/10 rounded text-xs">
              Disagree
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="text-red-400 text-xs">
            ⚠ Warning
          </span>
          <button className="block mt-3 text-xs bg-blue-500 px-3 py-1 rounded">
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
