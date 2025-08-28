"use client";

import { useEffect, useRef } from "react";
import Markdown from 'react-markdown'

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function SimpleRich({ text }: { text: string }) {
  // return <p className="whitespace-pre-wrap break-words">{text}</p>;
  return <Markdown>{text}</Markdown> //Me lo devuelve sin asteriscos o la forma del chat
}

export default function ChatArea({
  messages,
  errorMsg,
}: {
  messages: ChatMessage[];
  errorMsg: string | null;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="flex h-full min-h-0 flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur px-5 py-3">
        <h1 className="text-sm font-medium text-neutral-600">Consulta sobre React</h1>
      </div>

      {/* Área scroll */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
            >
              {/* Avatar assistant */}
              {!isUser && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/trvl-bot.png"
                    alt="TRVL Bot"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Burbuja */}
              {isUser ? (
                // USER:
                <div className="max-w-[75%] rounded-2xl p-[1px] bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                  <div className="rounded-2xl p-3 text-sm bg-[#121111] text-white shadow-sm">
                    <div className="whitespace-pre-wrap break-words">
                      <Markdown>{m.content}</Markdown>
                    </div>
                  </div>
                </div>
              ) : (
                // ASSISTANT: 
                <div className="max-w-[75%] rounded-2xl p-3 text-sm bg-white shadow-sm text-neutral-800">
                  <SimpleRich text={m.content} />
                </div>
              )}
            </div>
          );
        })}

        {errorMsg && (
          <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm p-3">
            {errorMsg}
          </div>
        )}

        <div ref={endRef} />
      </div>
    </section>
  );
}
