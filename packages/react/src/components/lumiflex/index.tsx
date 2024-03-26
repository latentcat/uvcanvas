import React from "react";
import { Lumiflex, LumiflexState } from "uvcanvas";
import useUVComponent from "../../hooks/use-uv-component";

export function ReactLumiflex(props: Partial<LumiflexState>) {
  const { containerRef } = useUVComponent({
    uvc: Lumiflex,
    states: props,
  });

  return <div style={{ width: "100%", height: "100%" }} ref={containerRef} />;
}
