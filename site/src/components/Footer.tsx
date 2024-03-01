import {Container, ContainerWide} from "@/components/Containers";
import Link from "next/link";


export function Footer() {
  return (
    <div className="_border-t py-9 lg:py-12">
      <Container>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} {" "}
          <Link href="https://latentcat.com" target="_blank" className="border-b">
            Latent Cat
          </Link>
          {" "}. All rights
          reserved.
        </p>
      </Container>
    </div>
  )
}