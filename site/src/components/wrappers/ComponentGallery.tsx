import {ComponentWrapper} from "@/components/wrappers/ComponentWrapper";
import Link from "next/link";
import {ComponentItemProps, componentList} from "@/lib/docs-navigation";




function ComponentItem(props: ComponentItemProps) {
  return (
    <Link href={"/docs/components/" + props.id}>
      <div className="flex flex-col items-start">
        <ComponentWrapper>
          <props.component />
        </ComponentWrapper>
        <h3 className="mt-2.5 text-sm leading-5 _font-medium text-foreground font-mono">
          <span className="opacity-50">{"<"}</span>
          {props.name}
          <span className="opacity-50">{" />"}</span>
        </h3>
        <p className="text-xs leading-5 text-foreground/50">{props.desc}</p>
      </div>
    </Link>
  )
}


interface ComponentGallery {
  limit?: number
}


export function ComponentGallery(props: ComponentGallery) {

  const list = componentList.slice(0, props.limit || componentList.length)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 _xl:grid-cols-4 gap-x-3 gap-y-6 not-prose">
      {list.map((item, index) => (
        <ComponentItem {...item} key={item.id}/>
      ))}
    </div>
  )
}