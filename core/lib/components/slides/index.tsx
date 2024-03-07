
import { EvaluateOptions, evaluateSync } from "@mdx-js/mdx";
import { MDXComponents, MDXModule } from "mdx/types";
import { useHotkeys } from "react-hotkeys-hook";
import { useMemo, useState } from "react";
import * as runtime from "react/jsx-runtime";
import React from "react";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {useResizeDetector} from "react-resize-detector";
import {Provider, atom, useAtom } from "jotai";


const pageAtom = atom(0)
const stepAtom = atom(0)


interface MetadataProps {
  step?: number
}


export function Slides({
  mdx,
  components,
}: {
  mdx: MDXModule[];
  components: MDXComponents;
}) {

  const [currentPage, setCurrentPage] = useAtom(pageAtom)
  const [currentStep, setCurrentStep] = useAtom(stepAtom)

  const metadatas: MetadataProps[] = useMemo(() => (
    mdx.map((item) => (
      {
        ...item.metadata as object
      }
    ))
  ), [mdx])

  const metadata= metadatas[currentPage]

  const step = metadata.step ?? 1

  const pageUp = () => {
    if (currentStep < step - 1) {
      setCurrentStep(
        (step) => step = step + 1
      )
    } else if (currentPage < mdx.length - 1) {
      setCurrentPage(
        (page) => page = page + 1
      )
      setCurrentStep(0)
    }
  }
  const pageDown = () => {
    if (currentStep > 0) {
      setCurrentStep(
        (step) => step = Math.max(step - 1, 0)
      )
    } else {
      if (currentPage > 0 && currentStep === 0) {
        setCurrentStep((metadatas[currentPage - 1].step ?? 1) - 1)
      }
      setCurrentPage(
        (page) => page = Math.max(page - 1, 0)
      )
    }
  }

  useHotkeys("left", pageDown);
  useHotkeys("right", pageUp);


  const { width = 640, height, ref } = useResizeDetector();

  const styleVariables = {
    "--border": "240 3.7% 15.9%",
    "--vw": `${width * 1 / 100}px`,
  } as React.CSSProperties;

  const constants = {
    currentPage: currentPage + 1,
    totalPage: mdx.length,
    currentStep: currentStep,
    totalStep: step,
  }

  return (

    <Provider>
      <div
        ref={ref}
        style={{
          width: "100%",
          border: "1px hsl(var(--border)) solid",
          borderRadius: "10px",
          overflow: "hidden",
          ...styleVariables
        }}
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
              ...constants
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
          >

          </div>
          <AspectRatio ratio={16 / 9}/>
        </div>
      </div>
    </Provider>
  );
}