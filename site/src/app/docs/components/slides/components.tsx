"use client"

import { motion } from "framer-motion"
import {transitionMd} from "@/lib/animations";

interface TestAnimationProps {
  step: number
}

export function TestAnimation(props: TestAnimationProps) {
  return (
    <motion.div
      initial={{
        x: `calc(${props.step * 20} * var(--vw))`
      }}
      animate={{
        x: `calc(${props.step * 20} * var(--vw))`
      }}
      transition={transitionMd}
      className="w-[calc(20*var(--vw))] h-[calc(20*var(--vw))] my-[calc(3*var(--vw))] rounded-full bg-white"
    >

    </motion.div>
  )
}