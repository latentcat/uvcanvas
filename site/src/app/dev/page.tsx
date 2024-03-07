"use client";

import { Button } from "@/components/Button";
import { ContainerWide } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import {Lumiflex, Zenitho, Novatrix, Velustro, Tranquiluxe, Opulento, Slides, defaultComponents} from "uvcanvas";
import rawMdx from "./slides.raw.mdx"
import {sliceMdxString} from "uvcanvas";
import {LumiflexWithControl} from "@/components/wrappers/templates/LumiflexWithControl";
import {TestAnimation} from "@/app/dev/components";
import {SlidesActionButton} from "uvcanvas";
import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";
import clsx from "clsx";


const mdxContents = sliceMdxString(rawMdx as unknown as string)

export default function Page() {

  return (
    <div>
      <HeaderPadding />
      <div className="h-12" />
      <ContainerWide className="flex flex-col items-center px-6 lg:px-12">
        <div className="max-w-2xl w-full">
          <LumiflexWithControl/>
          <div className="h-12"/>
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
          />
          <div className="h-12"/>
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
                "absolute opacity-0 group-hover:opacity-100 transition-opacity",
                "w-[calc(10*var(--vw))] h-[calc(10*var(--vw))]",
                "rounded-full ring-1 ring-white/10 bg-black/30 flex items-center justify-center",
                "backdrop-saturate-150 backdrop-blur-lg",
              )}
            >
              <ArrowLeftIcon className="w-[60%] h-[60%]" />
            </SlidesActionButton>
            <SlidesActionButton
              variant="right"
              className={clsx(
                "right-[5%] top-1/2 -translate-y-1/2",
                "absolute opacity-0 group-hover:opacity-100 transition-opacity",
                "w-[calc(10*var(--vw))] h-[calc(10*var(--vw))]",
                "rounded-full ring-1 ring-white/10 bg-black/30 flex items-center justify-center",
                "backdrop-saturate-150 backdrop-blur-lg",
              )}
            >
              <ArrowRightIcon className="w-[60%] h-[60%]" />
            </SlidesActionButton>
          </Slides>
          <div className="h-12"/>
          <div className="h-12"/>
        </div>
      </ContainerWide>
    </div>
  );
}
