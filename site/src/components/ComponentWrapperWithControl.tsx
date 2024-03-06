"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { clsx } from "clsx";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import Lumiflex from "@/components/registry/Lumiflex";

interface ComponentWrapperWithControlProps
  extends React.ComponentPropsWithoutRef<"div"> {
  render: (props: React.ComponentProps<typeof Lumiflex>) => React.ReactNode;
}

export function ComponentWrapperWithControl__Lumiflex(
  props: ComponentWrapperWithControlProps,
) {
  const { children, className, render, ...rest } = props;

  const [time, setTime] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-xl not-prose">
      <div
        className={clsx(
          className,
          "relative w-full overflow-hidden bg-foreground/5",
        )}
        {...rest}
      >
        <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
          {render({
            time: time,
          })}
        </div>
        <AspectRatio ratio={16 / 9} />
      </div>

      <div className="p-6">
        <div>{time}</div>

        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className={cn("w-[60%]", className)}
          onValueChange={(value) => setTime(value[0])}
        />
      </div>

      <div className="absolute w-full h-full top-0 left-0 rounded-xl ring-1 ring-inset ring-foreground/10 pointer-events-none" />
    </div>
  );
}

export function LumiflexWithControl() {
  return (
    <ComponentWrapperWithControl__Lumiflex
      render={(props) => <Lumiflex {...props} />}
    />
  );
}
