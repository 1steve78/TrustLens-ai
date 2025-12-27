export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-[120px] flex items-center px-10 z-50">
      <div className="glass rounded-full px-6 py-3 flex gap-6 items-center">
        <span className="font-semibold text-blue-400">SecureScan</span>
        <nav className="flex gap-4 text-sm text-gray-300">
          <a href="#">Scan</a>
          <a href="#">History</a>
          <a href="#">Profile</a>
        </nav>
      </div>
    </header>
  );
}
