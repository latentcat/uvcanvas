import {ComponentWrapper} from "@/components/ComponentWrapper";
import Link from "next/link";
import {ComponentItemProps, componentList} from "@/lib/docs-navigation";




function ComponentItem(props: ComponentItemProps) {
  return (
    <Link href={"/docs/components/" + props.id}>
      <div className="flex flex-col items-start">
        <ComponentWrapper>
          <props.component />
        </ComponentWrapper>
        <h3 className="mt-2.5 text-base leading-6 _font-medium text-foreground font-mono">
          <span className="opacity-50">{"<"}</span>
          {props.name}
          <span className="opacity-50">{" />"}</span>
        </h3>
        <p className="text-xs leading-5 text-foreground/50">{props.desc}</p>
      </div>
    </Link>
  )
}


export function ComponentGallery() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 _xl:grid-cols-4 gap-x-3 gap-y-6 not-prose">
      {componentList.map((item, index) => (
        <ComponentItem {...item} key={item.id}/>
      ))}
    </div>
  )
}