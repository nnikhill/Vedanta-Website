export default function SidebarItem({ text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg"
    >
      {text}
    </div>
  );
}