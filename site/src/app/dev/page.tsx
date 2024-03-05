import { LumiflexWithControl } from "@/components/ComponentWrapperWithControl";
import {Container, ContainerWide} from "@/components/Containers";
import {HeaderPadding} from "@/components/Header";

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
    </div>
  )
}