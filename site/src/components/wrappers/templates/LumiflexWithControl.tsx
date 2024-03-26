import { LumiflexState } from "@uvcanvas/react";
import React from "react";
import { ComponentWrapperWithControl } from "@/components/wrappers/ComponentWrapperWithControl";
import { ReactLumiflex } from "@uvcanvas/react";
import { ConfigType } from "@/components/wrappers/param_type";

const params: ConfigType<LumiflexState>[] = [
  {
    type: "number",
    name: "time",
    label: "Time",
    config: {
      optional: true,
      min: 0,
      max: 100,
    },
  },
  {
    type: "boolean",
    name: "paused",
    label: "Paused",
  },
];

export function LumiflexWithControl() {
  return (
    <ComponentWrapperWithControl<LumiflexState>
      component={ReactLumiflex}
      params={params}
    />
  );
}
