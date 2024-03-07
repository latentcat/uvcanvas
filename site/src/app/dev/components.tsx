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
      transition={transitionMd}
      className="w-24 h-24 my-6 rounded-full bg-white"
    >

    </motion.div>
  )
}