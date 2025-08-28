"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import ChatArea, { ChatMessage } from "./ChatArea";
import Composer from "./Composer";

export default function ChatShell({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const API = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
    []
  );

  // cargar historial 
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErrorMsg(null);
    
        const res = await fetch(`${API}/conversations/${conversationId}/messages`);
        if (!res.ok) {
          // si es nueva (404), dejamos vacío sin mostrar error
          if (res.status === 404) {
            if (!cancelled) setMessages([]);
            return;
          }
          throw new Error("No pude cargar el historial.");
        }
        const data: ChatMessage[] = await res.json();
        if (!cancelled) setMessages(data);
      } catch {
        
        setMessages([]);
      }
    })();
    return () => { cancelled = true; };
  }, [API, conversationId]);

  async function handleSend(text: string) {
    if (!text.trim() || loading) return;
    setErrorMsg(null);
    setLoading(true);

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
     

      const res = await fetch(`${API}/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (!res.ok) throw new Error("Error en la API");
      const assistantMsg: ChatMessage = await res.json();
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-4 p-6">
      <Card className="flex-1 rounded-3xl bg-white text-neutral-900 shadow-2xl ring-1 ring-black/10 overflow-hidden">
        <ChatArea messages={messages} errorMsg={errorMsg} />
      </Card>
      <Composer onSend={handleSend} disabled={loading} />
    </div>
  );
}
