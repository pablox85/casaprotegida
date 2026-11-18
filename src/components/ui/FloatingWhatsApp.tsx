"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const STORAGE_KEY = "casa-protegida-whatsapp-offset";
const MIN_EDGE_SPACE = 16;
const DRAG_THRESHOLD = 5;

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  startRight: number;
  startBottom: number;
  buttonWidth: number;
  buttonHeight: number;
}

export function FloatingWhatsApp() {
  const [bottomOffset, setBottomOffset] = useState<number | null>(null);
  const [rightOffset, setRightOffset] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState | null>(null);
  const currentBottomOffset = useRef<number | null>(null);
  const currentRightOffset = useRef<number | null>(null);
  const didDrag = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedValue = window.localStorage.getItem(STORAGE_KEY);
      if (!savedValue) return;

      try {
        const savedOffset = JSON.parse(savedValue) as number | { bottom?: number; right?: number };
        if (typeof savedOffset === "number" && Number.isFinite(savedOffset) && savedOffset > 0) {
          setBottomOffset(savedOffset);
        } else if (savedOffset && typeof savedOffset === "object") {
          const savedBottom = savedOffset.bottom;
          const savedRight = savedOffset.right;
          if (typeof savedBottom === "number" && Number.isFinite(savedBottom) && savedBottom > 0) {
            setBottomOffset(savedBottom);
          }
          if (typeof savedRight === "number" && Number.isFinite(savedRight) && savedRight > 0) {
            setRightOffset(savedRight);
          }
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const phone = WHATSAPP_NUMBER;
  const message = encodeURIComponent("Hola, quisiera consultar por redes de protección.");
  const href = phone ? `https://wa.me/${phone}?text=${message}` : "#contacto";

  const handlePointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRight: window.innerWidth - rect.right,
      startBottom: window.innerHeight - rect.bottom,
      buttonWidth: rect.width,
      buttonHeight: rect.height,
    };
    currentBottomOffset.current = window.innerHeight - rect.bottom;
    currentRightOffset.current = window.innerWidth - rect.right;
    didDrag.current = false;
    setIsDragging(true);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const drag = dragState.current;
      if (!drag || drag.pointerId !== moveEvent.pointerId) {
        return;
      }

      const verticalDistance = moveEvent.clientY - drag.startY;
      const horizontalDistance = moveEvent.clientX - drag.startX;
      if (Math.hypot(horizontalDistance, verticalDistance) > DRAG_THRESHOLD) {
        didDrag.current = true;
      }

      const maximumBottom = window.innerHeight - drag.buttonHeight - MIN_EDGE_SPACE;
      const maximumRight = window.innerWidth - drag.buttonWidth - MIN_EDGE_SPACE;
      const nextBottom = Math.min(
        maximumBottom,
        Math.max(MIN_EDGE_SPACE, drag.startBottom - verticalDistance),
      );
      const nextRight = Math.min(
        maximumRight,
        Math.max(MIN_EDGE_SPACE, drag.startRight - horizontalDistance),
      );

      setBottomOffset(nextBottom);
      setRightOffset(nextRight);
      currentBottomOffset.current = nextBottom;
      currentRightOffset.current = nextRight;
    };

    const finishDrag = (upEvent: PointerEvent) => {
      if (dragState.current?.pointerId !== upEvent.pointerId) {
        return;
      }

      if (currentBottomOffset.current !== null || currentRightOffset.current !== null) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            bottom: currentBottomOffset.current,
            right: currentRightOffset.current,
          }),
        );
      }
      dragState.current = null;
      setIsDragging(false);
      if (currentRightOffset.current !== null) {
        setRightOffset(currentRightOffset.current);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);
  };

  return (
    <a
      className="floating-whatsapp"
      href={href}
      style={{
        ...(bottomOffset ? { bottom: `${bottomOffset}px` } : {}),
        ...(rightOffset !== null ? { right: `${rightOffset}px` } : {}),
      }}
      data-dragging={isDragging}
      aria-label="Iniciar consulta por WhatsApp"
      draggable={false}
      onPointerDown={handlePointerDown}
      onDragStart={(event) => event.preventDefault()}
      onClick={(event) => {
        if (didDrag.current) {
          event.preventDefault();
          didDrag.current = false;
        }
      }}
    >
      <WhatsAppIcon size={20} src="/images/wpp_black.svg" />
    </a>
  );
}
