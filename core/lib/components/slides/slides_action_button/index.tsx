import React from "react";
import { useSetAtom } from "jotai";
import { setPageAtom } from "../state";

interface SlidesActionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "left" | "right";
}

export function SlidesActionButton(props: SlidesActionButtonProps) {
  const { variant, children, onClick, ...rest } = props;

  const setPage = useSetAtom(setPageAtom);

  const action = () => {
    setPage({
      forward: variant === "right",
    });
  };

  return (
    <div
      onClick={(e) => {
        action();
        onClick && onClick(e);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
