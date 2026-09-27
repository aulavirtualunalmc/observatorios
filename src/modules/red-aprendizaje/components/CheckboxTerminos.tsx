"use client";

import React, { useState } from "react";
import { Checkbox } from "@heroui/react";

export default function CheckboxTerminos() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-start gap-2.5 py-1 px-0.5">
      {/* Checkbox de HeroUI */}
      <div
        className="cursor-pointer shrink-0 mt-0.5"
        onClick={() => setChecked(!checked)}
      >
        <Checkbox
          isSelected={checked}
          onChange={() => setChecked(!checked)}
          aria-label="Aceptar Política de Privacidad y Tratamiento de Datos Personales"
        >
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox.Content>
        </Checkbox>
      </div>

      {/* Input oculto vinculado para FormData */}
      <input
        type="checkbox"
        id="aceptaTratamientoDatos"
        name="aceptaTratamientoDatos"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Texto simple y enlace */}
      <span
        onClick={() => setChecked(!checked)}
        className="text-xs text-[#2f3437] leading-[1.5] select-none cursor-pointer"
      >
        He leído y acepto la{" "}
        <a
          href="/privacidad"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="font-semibold text-[#0064c1] hover:underline"
        >
          Política de Privacidad y Tratamiento de Datos Personales
        </a>
      </span>
    </div>
  );
}
