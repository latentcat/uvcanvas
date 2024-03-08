"use client";

import "uvcanvas/dist/components/slides/default_components/styles.css"
import {Lumiflex, Zenitho, Novatrix, Velustro, Tranquiluxe, Opulento, Slides, defaultComponents} from "uvcanvas";
import rawMdx from "./slides.raw.mdx"
import {sliceMdxString} from "uvcanvas";
import {TestAnimation} from "./components";
import {SlidesActionButton} from "uvcanvas";
import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";
import clsx from "clsx";
import React from "react";


const mdxContents = sliceMdxString(rawMdx as unknown as string)

export default function SlidesExample() {

  return (
    <div
      className="relative rounded-lg overflow-hidden not-prose text-white"
    >
      <Slides
        mdx={mdxContents}
        components={{
          ...defaultComponents,
          Lumiflex,
          Zenitho,
          Novatrix,
          Velustro,
          Tranquiluxe,
          Opulento,

          TestAnimation,
        }}
        className="group"
      >
        <SlidesActionButton
          variant="left"
          className={clsx(
            "left-[5%] top-1/2 -translate-y-1/2",
            "absolute opacity-0 group-hover:opacity-100 [:fullscreen_&]:hidden transition-opacity",
            "w-[calc(10*var(--svw))] h-[calc(10*var(--svw))]",
            "rounded-full ring-1 ring-white/10 bg-black/30 flex items-center justify-center",
            "backdrop-saturate-150 backdrop-blur-lg",
          )}
        >
          <ArrowLeftIcon className="w-[60%] h-[60%]"/>
        </SlidesActionButton>
        <SlidesActionButton
          variant="right"
          className={clsx(
            "right-[5%] top-1/2 -translate-y-1/2",
            "absolute opacity-0 group-hover:opacity-100 [:fullscreen_&]:hidden transition-opacity",
            "w-[calc(10*var(--svw))] h-[calc(10*var(--svw))]",
            "rounded-full ring-1 ring-white/10 bg-black/30 flex items-center justify-center",
            "backdrop-saturate-150 backdrop-blur-lg",
          )}
        >
          <ArrowRightIcon className="w-[60%] h-[60%]"/>
        </SlidesActionButton>
      </Slides>
      <div
        className="absolute w-full h-full top-0 left-0 rounded-xl ring-1 ring-inset ring-foreground/10 pointer-events-none"/>
    </div>
  );
}
