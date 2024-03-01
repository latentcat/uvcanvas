import {AspectRatio} from "@/components/ui/aspect-ratio";
import {clsx} from "clsx";


interface ComponentWrapperProps extends React.ComponentPropsWithoutRef<'div'> {

}

export function ComponentWrapper(props: ComponentWrapperProps) {
  const { children, className, ...rest } = props
  return (
    <div
      className={clsx(
        className,
        "relative w-full overflow-hidden rounded-lg bg-foreground/5"
      )}
      {...rest}
    >
      <div className="absolute w-full h-full top-0 left-0">
        {children}
      </div>
      <div className="absolute w-full h-full top-0 left-0 z-10 rounded-lg ring-1 ring-inset ring-foreground/10">

      </div>
      <AspectRatio ratio={16 / 9}/>
    </div>
  )
}