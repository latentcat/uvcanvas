import { useEffect, useRef } from "react";
import Gradient from "./Gradient";
import React from "react";

export function Zenitho() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const style = {
    "--gradient-color-1": "#ef008f",
    "--gradient-color-2": "#6ec3f4",
    "--gradient-color-3": "#7038ff",
    "--gradient-color-4": "#ffba27",
  } as React.CSSProperties;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const gradient = new Gradient();
    gradient.initGradient(canvasRef.current);
  }, []);

  return (
    <div>
      <canvas style={style} ref={canvasRef} />
    </div>
  );
}
