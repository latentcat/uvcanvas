import React from "react";
import { Zenitho } from "uvcanvas";
import useUVComponent from "../../hooks/use-uv-component";

export function ReactZenitho() {
  const { containerRef } = useUVComponent({
    uvc: Zenitho,
  });

  return <div style={{ width: "100%", height: "100%" }} ref={containerRef} />;
}
