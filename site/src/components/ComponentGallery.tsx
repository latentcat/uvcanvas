import {ComponentWrapper} from "@/components/ComponentWrapper";


export function ComponentGallery() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 _xl:grid-cols-4 gap-6">
      <ComponentWrapper></ComponentWrapper>
      <ComponentWrapper></ComponentWrapper>
      <ComponentWrapper></ComponentWrapper>
      <ComponentWrapper></ComponentWrapper>
      <ComponentWrapper></ComponentWrapper>
      <ComponentWrapper></ComponentWrapper>
    </div>
  )
}