import {ComponentWrapper} from "@/components/ComponentWrapper";
import Link from "next/link";


const componentList = [
  {
    name: "Lumiflex",
    id: "lumiflex",
    desc: "CSS Gradient",
  },
  {
    name: "Zenitho",
    id: "zenitho",
    desc: "",
  },
  {
    name: "Novatrix",
    id: "novatrix",
    desc: "",
  },
  {
    name: "Velustro",
    id: "velustro",
    desc: "",
  },
  {
    name: "Tranquiluxe",
    id: "tranquiluxe",
    desc: "",
  },
  {
    name: "Opulento",
    id: "opulento",
    desc: "",
  },
]

interface ComponentItemProps {
  name: string
  id: string
  desc: string
}

function ComponentItem(props: ComponentItemProps) {
  return (
    <Link href={"/docs/components/" + props.id}>
      <div className="flex flex-col items-start">
        <ComponentWrapper></ComponentWrapper>
        <h3 className="mt-3 text-base leading-6 font-bold text-foreground">{props.name}</h3>
        <p className="text-sm text-foreground/50">{props.desc}</p>
      </div>
    </Link>
  )
}


export function ComponentGallery() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 _xl:grid-cols-4 gap-4 not-prose">
      {componentList.map((item, index) => (
        <ComponentItem {...item} key={item.id}/>
      ))}
    </div>
  )
}