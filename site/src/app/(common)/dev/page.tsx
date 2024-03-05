import { LumiflexWithControl } from "@/components/ComponentWrapperWithControl";
import {Container} from "@/components/Containers";
import {HeaderPadding} from "@/components/Header";

export default function Page() {
  return (
    <div>
      <HeaderPadding />
      <div className="h-12" />
      <Container>
        <LumiflexWithControl />
      </Container>
    </div>
  )
}