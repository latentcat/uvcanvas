"use client"

import {AspectRatio} from "@/components/ui/aspect-ratio";
import {clsx} from "clsx";
import {motion} from "framer-motion"
import {transitionLg} from "@/lib/animations";

const genParam = (index: number) => {
  let start = 5
  let k = (1 / (start + index)) * start
  let offsetY = 500
  return {
    y: -offsetY + k * (offsetY - 120),
    scale: 0.8 * k,
    opacity: 1.0 - index * 0.25,
    blur: index * 10
  }
}

const bgList = [
  {
    ...genParam(3)
  },
  {
    ...genParam(2)
  },
  {
    ...genParam(1)
  },
  {
    ...genParam(0)
  },
]


export default function SectionBgStack() {
  return (
    <div className="relative h-72 w-full overflow-hidden">
      <div className="absolute bottom-0 translate-y-full w-full">
        {bgList.map((item, index) => (
          <motion.div
            key={index}
            className={clsx(
              "absolute w-full bg-background rounded-2xl origin-top overflow-hidden",
            )}
            animate={{
              y: item.y,
              scale: item.scale,
              filter: `blur(${item.blur}px)`,
            }}
            transition={transitionLg}
          >
            <div
              className="absolute w-full h-full top-0 left-0 bg-zinc-500"
              style={{
                opacity: item.opacity,
              }}
            >

            </div>
            <AspectRatio ratio={16 / 9}/>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/5"/>
    </div>
  )
}