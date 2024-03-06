"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { clsx } from "clsx";
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import Lumiflex from "@/components/registry/Lumiflex";
import { LumiflexProps } from "uvcanvas/dist/components/lumiflex";
import { UseFormReturn, useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import React from "react";

interface ComponentWrapperWithControlProps<P extends {}>
  extends HTMLAttributes<HTMLDivElement> {
  component: (props: P) => React.ReactNode;
  render: (form: UseFormReturn<P>) => React.ReactNode;
}

export function ComponentWrapperWithControl<P extends {}>(
  props: ComponentWrapperWithControlProps<P>
) {
  const { children, className, component: Component, render, ...rest } = props;
  const form = useForm<P>();
  const componentProps = useWatch({ control: form.control }) as P;

  return (
    <div className="relative overflow-hidden rounded-xl not-prose">
      <div
        className={clsx(
          className,
          "relative w-full overflow-hidden bg-foreground/5"
        )}
        {...rest}
      >
        <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
          <Component {...componentProps} />
        </div>
        <AspectRatio ratio={16 / 9} />
      </div>
      <Form {...form}>
        <form className="p-6">{render(form)}</form>
      </Form>
      <div className="absolute w-full h-full top-0 left-0 rounded-xl ring-1 ring-inset ring-foreground/10 pointer-events-none" />
    </div>
  );
}

export function LumiflexWithControl() {
  return (
    <ComponentWrapperWithControl<LumiflexProps>
      component={Lumiflex}
      render={(form) => (
        <>
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time: {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className={cn("w-[60%]")}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      )}
    />
  );
}
