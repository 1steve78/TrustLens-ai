function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-t-md transition ${
        active
          ? "text-white border-b-2 border-white"
          : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
export default TabButton;