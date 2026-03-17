"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface SignaturePadProps {
  onSave: (blob: Blob) => void;
  onCancel: () => void;
  saving?: boolean;
}

export default function SignaturePad({ onSave, onCancel, saving }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) onSave(blob);
    }, "image/png");
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: "#1a1a1a", border: "1px solid #333", borderRadius: 16,
        padding: 24, maxWidth: 520, width: "100%",
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#e8e6e1" }}>
          Sign this contract
        </h3>
        <p style={{ fontSize: 13, color: "#9a9790", marginBottom: 16 }}>
          Draw your signature below. This will be legally binding.
        </p>

        <div style={{ border: "2px solid #333", borderRadius: 10, overflow: "hidden", marginBottom: 16, background: "#fff" }}>
          <canvas
            ref={canvasRef}
            width={480}
            height={200}
            style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair", touchAction: "none" }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
          <button
            onClick={clearCanvas}
            style={{
              padding: "8px 16px", background: "transparent", border: "1px solid #333",
              borderRadius: 6, color: "#9a9790", fontSize: 13, cursor: "pointer",
            }}
          >
            Clear
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onCancel}
              style={{
                padding: "8px 20px", background: "transparent", border: "1px solid #333",
                borderRadius: 6, color: "#9a9790", fontSize: 13, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasDrawn || saving}
              style={{
                padding: "8px 20px",
                background: !hasDrawn || saving ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
                color: "#0e0e0e", border: "none", borderRadius: 6, fontSize: 13,
                fontWeight: 600, cursor: !hasDrawn || saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Signing..." : "Confirm Signature"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
