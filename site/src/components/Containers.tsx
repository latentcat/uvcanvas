
export function ContainerWide(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="px-6 lg:px-12" {...props}>
      {props.children}
    </div>
  )
}

export function Container(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <ContainerWide>
      <div className="flex flex-col items-center" {...props}>
        <div className="w-full max-w-5xl">
          {props.children}
        </div>
      </div>
    </ContainerWide>
  )
}