import { useEffect, useRef } from "react";
import Gradient from "./Gradient";
import React from "react";

export function Zenitho() {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctnDom.current) {
      return;
    }

    const ctn = ctnDom.current;
    const gradient = new Gradient();
    gradient.initGradient({
      gradientColors: ["#ef008f", "#6ec3f4", "#7038ff", "#ffba27"],
    });
    ctn.appendChild(gradient.el);
    return () => {
      gradient.disconnect();
      ctn.removeChild(gradient.el);
      gradient.minigl.gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={ctnDom}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
