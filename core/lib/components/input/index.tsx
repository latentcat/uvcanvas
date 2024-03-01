import styles from './styles.module.css'
import React from "react";

// lib/components/Input/index.tsx
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...restProps } = props
  return <input className={`${className} ${styles.button}`} {...restProps} />
}