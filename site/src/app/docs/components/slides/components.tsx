"use client"

import { motion } from "framer-motion"
import {transitionMd} from "@/lib/animations";

interface TestAnimationProps {
  step: number
}

export function TestAnimation(props: TestAnimationProps) {
  return (
    <div
      className="w-full flex justify-center"
    >
      <motion.div
        initial={{
          x: `${(props.step - 1) * 10}em`,
          scale: 0.7,
        }}
        animate={{
          x: `${(props.step - 1) * 10}em`,
          scale: 1,
        }}
        transition={{type: 'spring', damping: 10, mass: 0.5, stiffness: 300}}
        className="w-[5em] h-[5em] my-[1.5em] rounded-full bg-white text-black flex flex-col items-center justify-center"
      >
      <span className="text-[2em]">
        {props.step + 1}
      </span>
      </motion.div>
    </div>
  )
}