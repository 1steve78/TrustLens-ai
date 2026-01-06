function FuturePlans() {
  return (
    <div className="glass rounded-xl p-6 space-y-3 text-sm text-gray-400">
      <h3 className="text-sm font-medium text-white">
        ⏳ Upcoming Features
      </h3>

      <ul className="space-y-2">
        <li className="flex items-center gap-2 opacity-80">
          <span>⏱</span>
          AI-generated scam explanations
        </li>

        <li className="flex items-center gap-2 opacity-80">
          <span>⏱</span>
          Browser extension for real-time protection
        </li>

        <li className="flex items-center gap-2 opacity-80">
          <span>⏱</span>
          Reputation system for trusted reporters
        </li>

        <li className="flex items-center gap-2 opacity-80">
          <span>⏱</span>
          Advanced moderation and analytics dashboard
        </li>
      </ul>
    </div>
  );
}

export default FuturePlans;
