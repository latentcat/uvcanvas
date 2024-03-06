"use client";

import { Button } from "@/components/Button";
import { LumiflexWithControl } from "@/components/ComponentWrapperWithControl";
import { ContainerWide } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import {Slides} from "uvcanvas";

const mdx = `
# Page 1

<Demo />

---

# Page 2

Some Text...
`;

export default function Page() {
  return (
    <div>
      <HeaderPadding />
      <div className="h-12" />
      <ContainerWide className="flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <LumiflexWithControl/>
          <div className="h-12"/>
          <Slides
            mdx={mdx}
            components={{
              h1: (props: any) => <h1 style={{color: "tomato"}} {...props} />,
              Demo: (props: any) => <h1>This is a demo component</h1>,
            }}
          />
        </div>
      </ContainerWide>
    </div>
  );
}
