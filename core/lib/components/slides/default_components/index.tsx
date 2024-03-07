import React from "react";
import styles from "./styles.module.less";


export const defaultComponents = {
  h1: ({ style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      style={{
        fontSize: "2em",
        fontWeight: "bold",
        width: "100%",
        borderBottom: "calc(0.25 * var(--svw)) rgb(255 255 255 / 0.5) solid",
        paddingBottom: "calc(1 * var(--svw))",
        marginBottom: "calc(2 * var(--svw))",
        lineHeight: "1.5em",
        ...style,
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={styles.li} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={styles.ol} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={styles.ul} {...props} />
  ),
  Cover: ({
    style,
    className,
    children,
    ...props
  }: {
    title: string
    subtitle?: string
    header?: string
    footer?: string
  } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={ styles.cover + " " + className}
        {...props}
      >
        <h1>
          {props.title}
        </h1>
        {props.subtitle && (
          <h2
            style={{}}
          >
            {props.subtitle}
          </h2>
        )}
        <div className={ styles.cover_overlay }>
          <header>
            {props.header}
          </header>
          <footer>
            {props.footer}
          </footer>
        </div>
      </div>
    );
  },
  Background: ({
                 style,
                 className,
                 children,
                 ...props
               }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        style={{
          background: "black",
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          zIndex: "-1",
        }}
        {...props}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            ...style,
          }}
          className={className}
        >
          {children}
        </div>
      </div>
    );
  },
};
