"use client";

import { Button } from "@/components/Button";
import { LumiflexWithControl } from "@/components/ComponentWrapperWithControl";
import { ContainerWide } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import {Lumiflex, Novatrix, Slides, defaultComponents, Tranquiluxe} from "uvcanvas";
import rawMdx from "./slides.raw.mdx"
import {sliceMdxString} from "uvcanvas";


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
              Novatrix,
              Tranquiluxe,
            }}
          />
          <div className="h-12"/>
          <div className="h-12"/>
        </div>
      </ContainerWide>
    </div>
  );
}
