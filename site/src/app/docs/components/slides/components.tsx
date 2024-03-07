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
        x: `calc(${props.step * 20} * var(--svw))`
      }}
      animate={{
        x: `calc(${props.step * 20} * var(--svw))`
      }}
      transition={{ type: 'spring', damping: 10, mass: 0.5, stiffness: 300 }}
      className="w-[calc(20*var(--svw))] h-[calc(20*var(--svw))] my-[calc(3*var(--svw))] rounded-full bg-white"
    >

    </motion.div>
  )
}