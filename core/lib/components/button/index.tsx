import styles from './styles.module.css'
import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props
  return <button className={`${className} ${styles.button}`} {...restProps} />
}