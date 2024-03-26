import React from "react";
import { Tranquiluxe } from "uvcanvas";
import useUVComponent from "../../hooks/use-uv-component";

export function ReactTranquiluxe() {
  const { containerRef } = useUVComponent({
    uvc: Tranquiluxe,
  });

  return <div style={{ width: "100%", height: "100%" }} ref={containerRef} />;
}
