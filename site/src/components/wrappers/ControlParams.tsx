import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import React from "react";
import {CommonControlProps, ParamBooleanControlProps, ParamNumberControlProps} from "@/components/wrappers/param_type";
import {ControllerRenderProps, FieldValues, Path} from "react-hook-form";
import { Switch } from "@/components/ui/switch"



type ControlCommonProps<P extends FieldValues> = CommonControlProps<P> & { field: ControllerRenderProps<P, Path<P>> }


export function ParamNumberControl<P extends FieldValues>(props: ControlCommonProps<P> & ParamNumberControlProps) {
  return (
    <FormItem className="flex items-center py-1.5">
      <FormLabel className="w-48">{props.label}: {props.field.value !== undefined ? props.field.value : "undefined"}</FormLabel>
      {props.config?.optional && (
        <FormControl>
          {props.config?.optional && (
            <Switch
              checked={props.field.value !== undefined}
              onCheckedChange={(value) => (
                props.field.onChange(props.field.value !== undefined ? undefined : (props.config?.default || 0))
              )}
            />
          )}
        </FormControl>
      )}
      <FormControl>
        <Slider
          value={props.field.value ? [props.field.value] : undefined}
          min={props.config?.min || 0}
          max={props.config?.max || 100}
          step={props.config?.step || 1}
          className={cn("w-[60%]")}
          onValueChange={(value) => props.field.onChange(value[0])}
        />
      </FormControl>
    </FormItem>
  )
}



export function ParamBooleanControl<P extends FieldValues>(props: ControlCommonProps<P> & ParamBooleanControlProps) {
  return (
    <FormItem className="flex items-center py-1.5">
      <FormLabel className="w-48">{props.label}</FormLabel>
      <FormControl>
        <Switch
          checked={props.field.value}
          onCheckedChange={(value) => props.field.onChange(value)}
        />
      </FormControl>
    </FormItem>
  )
}