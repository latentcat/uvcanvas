import {LumiflexProps} from "uvcanvas/dist/components/lumiflex";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import React from "react";
import {ComponentWrapperWithControl} from "@/components/wrappers/ComponentWrapperWithControl";
import {Lumiflex} from "uvcanvas";
import {ParamType, CommonControlProps, ConfigType, ParamNumberControlProps} from "@/components/wrappers/param_type";


const params: ConfigType<LumiflexProps>[] = [
  {
    type: "number",
    name: "time",
    label: "Time",
    config: {
      optional: true,
      min: 0,
      max: 100,
    }
  },
  {
    type: "boolean",
    name: "paused",
    label: "Paused",
  },
]


export function LumiflexWithControl() {
  return (
    <ComponentWrapperWithControl<LumiflexProps>
      component={Lumiflex}
      params={params}
    />
  );
}



