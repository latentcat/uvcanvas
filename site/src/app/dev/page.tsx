"use client";

import { Button } from "@/components/Button";
import { LumiflexWithControl } from "@/components/ComponentWrapperWithControl";
import { ContainerWide } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { EvaluateOptions, evaluateSync } from "@mdx-js/mdx";
import { MDXComponents } from "mdx/types";
import { useMemo, useState } from "react";
import * as runtime from "react/jsx-runtime";

const mdx = `
# Page 1

<Demo />

---

# Page 2

Some Text...
`;

function SliceContainer({
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
  const pageUp = () =>
    setCurrentPage((page) => (page = Math.min(page + 1, slices.length - 1)));
  const pageDown = () =>
    setCurrentPage((page) => (page = Math.max(page - 1, 0)));

  return (
    <div>
      <div>
        {slices[currentPage]?.({
          components,
        })}
      </div>
      <Button arrow="left" onClick={pageDown} />
      <Button arrow="right" onClick={pageUp} />
      <AspectRatio ratio={16 / 9} />
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <HeaderPadding />
      <div className="h-12" />
      <ContainerWide className="flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <LumiflexWithControl />
        </div>
      </ContainerWide>
      <SliceContainer
        mdx={mdx}
        components={{
          h1: (props: any) => <h1 style={{ color: "tomato" }} {...props} />,
          Demo: (props: any) => <h1>This is a demo component</h1>,
        }}
      />
    </div>
  );
}
