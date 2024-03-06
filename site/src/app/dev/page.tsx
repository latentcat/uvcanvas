"use client";

import { Button } from "@/components/Button";
import { ContainerWide } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import {Lumiflex, Zenitho, Novatrix, Velustro, Tranquiluxe, Opulento, Slides, defaultComponents} from "uvcanvas";
import rawMdx from "./slides.raw.mdx"
import {sliceMdxString} from "uvcanvas";
import {LumiflexWithControl} from "@/components/wrappers/templates/LumiflexWithControl";


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
            }}
          />
          <div className="h-12"/>
          <div className="h-12"/>
        </div>
      </ContainerWide>
    </div>
  );
}
