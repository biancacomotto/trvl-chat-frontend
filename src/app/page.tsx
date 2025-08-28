"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatShell from "../components/ChatShell";

type Conv = { id: string; title: string };

export default function Home() {
  const [convs, setConvs] = useState<Conv[]>([
    { id: "c1", title: "Consulta sobre React" },
    { id: "c2", title: "Diseño de UI" }, //FIJAS ME QUEDAN PARA VER
  ]);
  const [activeId, setActiveId] = useState<string>(convs[0].id);

  function handleNewChat() {
    const id = "c" + Date.now();
    const nuevo: Conv = { id, title: "Nuevo chat" };
    setConvs((arr) => [nuevo, ...arr]);
    setActiveId(id); 
  }

  function handleSelect(id: string) {
    setActiveId(id);
  }

  return (
    <main className="h-screen bg-neutral-950 text-white">
      <div className="flex h-full">
        <Sidebar
          items={convs}
          activeId={activeId}
          onSelect={handleSelect}
          onNewChat={handleNewChat}
        />
        <ChatShell conversationId={activeId} />
      </div>
    </main>
  );
}

