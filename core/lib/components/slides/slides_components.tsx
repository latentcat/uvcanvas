import React from "react";


export const defaultComponents = {
  h1: ({ style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      style={{
        fontSize: "2em",
        fontWeight: "bold",
        width: "100%",
        borderBottom: "calc(0.25 * var(--vw)) rgb(255 255 255 / 0.5) solid",
        paddingBottom: "calc(1 * var(--vw))",
        marginBottom: "calc(2 * var(--vw))",
        ...style,
      }}
      {...props}
    />
  ),
  Demo: ({ style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      style={{
        color: "tomato",
        ...style,
      }}
      {...props}
    >
      Demo
    </h1>
  ),
  Background: ({ style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        zIndex: "-1",
        ...style,
      }}
      {...props}
    />
  ),
}