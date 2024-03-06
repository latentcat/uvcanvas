
import { EvaluateOptions, evaluateSync } from "@mdx-js/mdx";
import { MDXComponents } from "mdx/types";
import { useHotkeys } from "react-hotkeys-hook";
import { useMemo, useState } from "react";
import * as runtime from "react/jsx-runtime";
import React from "react";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {useResizeDetector} from "react-resize-detector";


export function Slides({
  mdx,
  components,
}: {
  mdx: string;
  components: MDXComponents;
}) {
  const slices = useMemo(() => {
    const rawSlices = mdx.split(/^---$/gm).map((mdx) => mdx.trim());
    const slices = rawSlices.map(
      (mdx) => evaluateSync(mdx, runtime as EvaluateOptions).default
    );
    return slices;
  }, [mdx]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageUp = () => setCurrentPage((page) => (page = Math.max(page - 1, 0)));
  const pageDown = () =>
    setCurrentPage((page) => (page = Math.min(page + 1, slices.length - 1)));
  useHotkeys("left", pageUp);
  useHotkeys("right", pageDown);


  const { width = 1920, height, ref } = useResizeDetector();

  const styleVariables = {
    "--border": "240 3.7% 15.9%",
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        border: "1px hsl(var(--border)) solid",
        borderRadius: "10px",
        ...styleVariables
      }}
    >
      <div
        style={{
          fontSize: `${width * 0.03}`,
        }}
      >
        <div>
          {slices[currentPage]?.({
            components,
          })}
        </div>
        <AspectRatio ratio={16 / 9}/>
      </div>
    </div>
  );
}