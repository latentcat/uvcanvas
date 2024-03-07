import { MDXComponents, MDXModule } from "mdx/types";
import { useHotkeys } from "react-hotkeys-hook";
import {HTMLAttributes, useEffect, useMemo, useRef} from "react";
import React from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useResizeDetector } from "react-resize-detector";
import {Provider, atom, useAtom, useSetAtom} from "jotai";
import {MetadataProps, metadatasAtom, pageAtom, setPageAtom, stepAtom} from "./state";



interface SlidesProps extends HTMLAttributes<HTMLDivElement>{
  mdx: MDXModule[];
  components: MDXComponents;
}

function SlidesInner({ mdx, components, children, style, ...rest }: SlidesProps) {
  const [currentPage, setCurrentPage] = useAtom(pageAtom);
  const [currentStep, setCurrentStep] = useAtom(stepAtom);
  const [currentMetadatas, setMetadatas] = useAtom(metadatasAtom);
  const setPage = useSetAtom(setPageAtom)

  const metadatas: MetadataProps[] = useMemo(
    () => {
      const tempMetadata: MetadataProps[] = mdx.map((item) => ({
        ...(item.metadata as object),
      }))
      setMetadatas(tempMetadata)
      return tempMetadata
    },
    [mdx]
  );

  const metadata = metadatas[currentPage];

  const step = metadata.step ?? 1;

  const pageDown = () => {
    setPage({
      forward: false
    })
  };
  const pageUp = () => {
    setPage({
      forward: true
    })
  };

  const { width = 320, height, ref } = useResizeDetector();

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useHotkeys<HTMLDivElement>("left", pageDown);
  const rightRef = useHotkeys<HTMLDivElement>("right", pageUp);
  useEffect(() => {
    ref.current = containerRef.current;
    leftRef.current = containerRef.current;
    rightRef.current = containerRef.current;
  }, [ref, leftRef, rightRef]);

  const styleVariables = {
    "--border": "240 3.7% 15.9%",
    "--vw": `${(width * 1) / 100}px`,
  } as React.CSSProperties;

  const constants = {
    currentPage: currentPage,
    totalPage: mdx.length,
    currentStep: currentStep,
    totalStep: step,
  };

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      style={{
        width: "100%",
        border: "1px hsl(var(--border)) solid",
        borderRadius: "10px",
        overflow: "hidden",
        userSelect: "none",
        outline: "none",
        ...styleVariables,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          fontSize: `calc(2.5 * var(--vw))`,
          position: "relative",
          zoom: "1",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            padding: "5%",
          }}
        >
          {mdx[currentPage]?.default({
            components,
            ...constants,
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        ></div>
        {children}
        <div style={{ pointerEvents: "none" }}>
          <AspectRatio ratio={16 / 9} />
        </div>
      </div>
    </div>
  );
}

export function Slides(props: SlidesProps) {
  return (
    <Provider>
      <SlidesInner {...props} />
    </Provider>
  );
}
