import Image from "next/image";
import {ThemeToggle} from "@/components/ThemeToggle";
import {UvcanvasLogoFull} from "@/components/Logos";
import {Button} from "@/components/ui/button";
import {HeaderPadding} from "@/components/Header";
import SectionBgStack, {Glow} from "@/app/SectionBgStack";
import Link from "next/link";
import {GitHubIcon} from "@/components/LogosBrand";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative w-full">
        <HeaderPadding />
        <div className="flex flex-col items-center px-12 pt-24 _pb-12 gap-6">
          <UvcanvasLogoFull className="h-16"/>
          <h1 className="hidden">UVCanvas</h1>
          <p className="text-lg opacity-70 leading-7 max-w-[300px] w-full text-center break-words">
            A React.js component library for Beautiful shaders canvas
          </p>
          <div className="flex gap-4">
            <Link href="/docs">
              <Button>Get Started</Button>
            </Link>
            <Link href="https://github.com/uvcanvas" target="_blank">
              <Button variant="secondary">
                <GitHubIcon className="h-4 mr-2"/>
                GitHub
              </Button>
            </Link>
          </div>
        </div>
        <SectionBgStack/>
        <Glow/>
      </div>
    </main>
  );
}
