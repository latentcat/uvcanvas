"use client";

import { ContainerWide } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import {LumiflexWithControl} from "@/components/wrappers/templates/LumiflexWithControl";



export default function Page() {

  return (
    <div>
      <HeaderPadding />
      <div className="h-12" />
      <ContainerWide className="flex flex-col items-center px-6 lg:px-12">
        <div className="max-w-2xl w-full">
          <LumiflexWithControl/>
          <div className="h-12"/>
          <div className="h-12"/>
        </div>
      </ContainerWide>
    </div>
  );
}
