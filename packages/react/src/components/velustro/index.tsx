import React from "react";
import { Velustro } from "uvcanvas";
import useUVComponent from "../../hooks/use-uv-component";

export function ReactVelustro() {
  const { containerRef } = useUVComponent({
    uvc: Velustro,
  });

  return <div style={{ width: "100%", height: "100%" }} ref={containerRef} />;
}
