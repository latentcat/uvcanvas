import React from "react";
import { Novatrix } from "uvcanvas";
import useUVComponent from "../../hooks/use-uv-component";

export function ReactNovatrix() {
  const { containerRef } = useUVComponent({
    uvc: Novatrix,
  });

  return <div style={{ width: "100%", height: "100%" }} ref={containerRef} />;
}
