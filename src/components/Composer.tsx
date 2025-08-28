// es la barra de escribir que siempre queda abajo. 
//para mi page separar bien 
"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function Composer({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  }

  return (
    <div className="bg-neutral-950/80 px-4 py-4">
      <form className="mx-auto flex max-w-3xl items-center gap-4" onSubmit={submit}>
        {/* Caja ovalada con borde animado */}
        <div className="flex-1 card-wrapper h-14 rounded-full">
          <div className="card-content rounded-full" />

          <div className="relative z-10 flex h-full items-center px-5">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-full bg-transparent text-base text-white
                         outline-none placeholder:text-white"
              placeholder="Escribe tu mensaje..."
            />
          </div>
        </div>

        {/* Botón circular separado */}
       <Button
          type="submit"
          disabled={disabled}
          aria-label="Enviar"
        >
          ➤
        </Button> 
      </form>
    </div> //cambiamos a boton de shadcn
  );
}
