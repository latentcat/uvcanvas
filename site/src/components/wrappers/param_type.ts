import {Path} from "react-hook-form";


export interface CommonControlProps<P> {
  type: ParamTypeLiteralAll
  name: Path<P>
  label: string
  desc?: string
}

export interface ParamNumberControlProps {
  type: 'number'
  config?: {
    default?: number
    optional?: boolean
    min?: number
    max?: number
    step?: number
  }
}

export interface ParamBooleanControlProps {
  type: 'boolean'
  config?: {
    status: string
    finished?: boolean
  }
}


export type ParamType = (ParamNumberControlProps | ParamBooleanControlProps) & {
  // uuid: string
};

export type ConfigType<P> = CommonControlProps<P> & ParamType

export type ParamConfigType<T extends ParamType> = T['config'];
export type ParamTypeLiteral<T extends ParamType> = T['type'];

export type ParamTypeLiteralAll = ParamType['type'];


export const block_attr = {
  start: {
    color: "#f59e0b",
    name: "Start",
  },
  compose_story: {
    color: "#84cc16",
    name: "Compose Story",
  },
  gen_story: {
    color: "#10b981",
    name: "Generate Story",
  },
  make_branch: {
    color: "#14b8a6",
    name: "Make Branch",
  },
}
