import Image from "next/image";
import {ThemeToggle} from "@/components/ThemeToggle";
import {UvcanvasLogoFull} from "@/components/Logos";
import {Button} from "@/components/ui/button";
import {HeaderPadding} from "@/components/Header";
import SectionBgStack, {Glow} from "@/app/SectionBgStack";
import Link from "next/link";
import {GitHubIcon} from "@/components/LogosBrand";
import {ComponentGallery} from "@/components/wrappers/ComponentGallery";
import {Code, Pre} from "@/components/Code";
import {GitHubButton} from "@/app/(common)/GitHubButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative w-full">
        <HeaderPadding />
        <div className="flex flex-col items-center px-12 pt-24 _pb-12 gap-6">
          <UvcanvasLogoFull className="h-16"/>
          <h1 className="hidden">UVCanvas</h1>
          <p className="text-lg text-foreground/70 leading-7 max-w-[500px] w-full text-center break-words">
            An open source React.js component library for beautifully shaded canvas, brought to you by{" "}
            <Link href="https://latentcat.com" target="_blank" className="text-foreground underline font-semibold">
              Latent Cat
            </Link>.
          </p>
          <div className="flex gap-4">
            <Link href="/docs">
              <Button>Get Started</Button>
            </Link>
            <Link href="https://github.com/latentcat/uvcanvas" target="_blank">
              <GitHubButton />
            </Link>
          </div>
        </div>
        <SectionBgStack/>
        <Glow/>
      </div>
      <div className="px-6 py-12">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold">Components</h2>
          <div className="h-12"/>
          <div className="w-full max-w-5xl">
            <ComponentGallery limit={6}/>
          </div>
          <div className="mt-6">
            <Link href="/docs/components">
              <Button variant="secondary">Browse more</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
