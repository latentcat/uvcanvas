import { type OGLRenderingContext, Renderer } from "ogl";
import {MutableRefObject, useEffect, useRef} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type AnyProps = Record<string, any>;

export declare type UseOglContext<
    Props extends AnyProps,
    // eslint-disable-next-line @typescript-eslint/ban-types
    AdditionalContext extends AnyProps = {},
> = AdditionalContext & {
    props: MutableRefObject<Props>;
    gl: OGLRenderingContext;
    renderer: Renderer;
    container: HTMLDivElement;
};

export declare type UseOglContextWithTime<
    Props extends AnyProps,
    // eslint-disable-next-line @typescript-eslint/ban-types
    AdditionalContext extends AnyProps = {},
> = UseOglContext<Props, AdditionalContext> & {
    time: number;
};


export interface UseOglProps<
    Props extends AnyProps,
    InitReturnType extends AnyProps,
> {
    props: Props;
    init: (context: UseOglContext<Props>) => InitReturnType;
    resize: (context: UseOglContext<Props, InitReturnType>) => void;
    render: (context: UseOglContextWithTime<Props, InitReturnType>) => void;
    destroy: (context: UseOglContext<Props, InitReturnType>) => void;
}

export function useOgl<Props extends AnyProps, InitReturnType extends AnyProps>(
    options: UseOglProps<Props, InitReturnType>,
) {
    const containerRef = useRef<HTMLDivElement>(null);
    const propsRef = useRef<Props>(options.props);

    const resizeObserver = useRef<ResizeObserver | null>(null);

    const rendererRef = useRef<Renderer | null>(null);
    const glRef = useRef<OGLRenderingContext | null>(null);

    function onResize() {
        const renderer = rendererRef.current;
        const container = containerRef.current;
        if (!container || !renderer) {
            return;
        }
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }

    useEffect(() => {
        propsRef.current = options.props;
    }, [options.props]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const renderer = (rendererRef.current = new Renderer());
        const gl = (glRef.current = renderer.gl);
        gl.clearColor(1, 1, 1, 1);

        window.addEventListener("resize", onResize);
        resizeObserver.current = new ResizeObserver(onResize);
        resizeObserver.current.observe(container);
        onResize();


        const baseContext: UseOglContext<Props> = {
            props: propsRef,
            gl,
            renderer,
            container,
        };

        const initReturn = options.init(baseContext);
        const withInitContext: UseOglContext<Props, InitReturnType> = {
            ...baseContext,
            ...initReturn,
        };

        options.resize(withInitContext);

        let animateId: number;

        function update(t: number) {
            animateId = requestAnimationFrame(update);
            options.render({ ...withInitContext, time: t });
        }
        animateId = requestAnimationFrame(update);

        container.appendChild(gl.canvas);

        return () => {
            window.cancelAnimationFrame(animateId);
            window.removeEventListener("resize", onResize);
            container.removeChild(gl.canvas);
            resizeObserver.current?.disconnect();
            options.destroy(withInitContext);
        };
    }, []);

    return containerRef;
}
