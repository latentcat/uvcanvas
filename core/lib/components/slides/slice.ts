import {EvaluateOptions, evaluateSync} from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";


export function sliceMdxString(mdx: string) {
  const rawSlices = mdx.split(/^---$/gm).map((mdx) => mdx.trim());
  const slices = rawSlices.map(
    (mdx) => evaluateSync(mdx, runtime as EvaluateOptions)
  );
  return slices;
}