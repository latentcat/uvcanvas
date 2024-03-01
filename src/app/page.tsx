import Image from "next/image";
import {ThemeToggle} from "@/components/ThemeToggle";
import {UvcanvasLogoFull} from "@/components/Logos";
import {Button} from "@/components/ui/button";
import {HeaderPadding} from "@/components/Header";
import SectionBgStack from "@/app/SectionBgStack";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeaderPadding />
      <div className="flex flex-col items-center px-12 pt-24 pb-12 gap-6">
        <UvcanvasLogoFull className="h-20"/>
        <h1 className="hidden">UVCanvas</h1>
        <p className="text-lg opacity-70 leading-8 max-w-[300px] w-full text-center break-words">
          A React.js component library for Beautiful shaders canvas
        </p>
        <div className="flex gap-4">
          <Button>Getting Started</Button>
          <Button variant="secondary">GitHub</Button>
        </div>
      </div>
      <SectionBgStack />
    </main>
  );
}
