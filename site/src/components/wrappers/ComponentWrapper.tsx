import {AspectRatio} from "@/components/ui/aspect-ratio";
import {clsx} from "clsx";
import {Suspense, useState} from "react";
import {Loader2} from "lucide-react";

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import Lumiflex from "@/components/registry/Lumiflex";

interface ComponentWrapperProps extends React.ComponentPropsWithoutRef<'div'> {

}


const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

async function TestComponent() {
  await sleep(3)
  return <div></div>
}
async function Loading() {
  return (
    <div className="flex items-center opacity-50 text-sm">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      loading...
    </div>
  )
}

export function ComponentWrapper(props: ComponentWrapperProps) {
  const { children, className, ...rest } = props
  return (
    <div
      className={clsx(
        className,
        "relative w-full overflow-hidden rounded-xl bg-foreground/5 not-prose"
      )}
      {...rest}
    >
      <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
        <Suspense fallback={<Loading />}>
          {children}
          {/*<TestComponent/>*/}
        </Suspense>
      </div>
      <div className="absolute w-full h-full top-0 left-0 rounded-xl ring-1 ring-inset ring-foreground/10" />
      <AspectRatio ratio={16 / 9}/>
    </div>
  )
}

