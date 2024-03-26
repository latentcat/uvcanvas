import { useEffect, useRef } from "react";
import { AnyValues, UVComponent, UVComponentClass } from "uvcanvas";

interface UseUVComponentProps<
  States extends AnyValues,
  SetupContext extends AnyValues,
> {
  uvc: UVComponentClass<States, SetupContext>;
  states?: Partial<States>;
}

interface UseUVComponentReturn<
  States extends AnyValues,
  SetupContext extends AnyValues,
> {
  containerRef: React.RefObject<HTMLDivElement>;
  uvcObj: UVComponent<States, SetupContext> | undefined;
}

export default function useUVComponent<
  States extends AnyValues = AnyValues,
  SetupContext extends AnyValues = AnyValues,
>(
  props: UseUVComponentProps<States, SetupContext>,
): UseUVComponentReturn<States, SetupContext> {
  const containerRef = useRef<HTMLDivElement>(null);
  const uvcRef = useRef<UVComponent<States, SetupContext>>();

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const uvc = new props.uvc({
      target: containerRef.current,
    });
    uvc.play();

    uvcRef.current = uvc;
    return () => {
      uvc.dispose();
    };
  }, [props.uvc]);

  useEffect(() => {
    if (props.states) {
      uvcRef.current?.setState(props.states);
    }
  }, [props.states]);

  return {
    containerRef,
    uvcObj: uvcRef.current,
  };
}
