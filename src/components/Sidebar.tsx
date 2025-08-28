//SIDEBAR LISTADO DE CHATS Y NEW CHAT
"use client";

type Item = { id: string; title: string };

export default function Sidebar({
  items,
  activeId,
  onSelect,
  onNewChat,
}: {
  items: Item[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}) {
  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-white/10 bg-neutral-900/60 backdrop-blur">
      <div className="p-4 border-b border-white/10">
        <button
          onClick={onNewChat}
          className="w-full rounded-lg bg-white/10 py-2 text-sm hover:bg-white/15 transition"
        >
          + Nuevo Chat
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={
                "w-full text-left rounded-lg border p-3 text-sm text-neutral-800 shadow-sm transition " +
                (isActive ? "bg-white" : "bg-white hover:bg-neutral-50")
              }
              title={c.title}
            >
              <span className="block truncate">{c.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
