import React from "react";
import { Opulento } from "uvcanvas";
import useUVComponent from "../../hooks/use-uv-component";

export function ReactOpulento() {
  const { containerRef } = useUVComponent({
    uvc: Opulento,
  });

  return <div style={{ width: "100%", height: "100%" }} ref={containerRef} />;
}
