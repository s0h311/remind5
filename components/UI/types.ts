import type { DefineComponent } from 'vue'

export type Link = {
  title: string
  path: string
  icon?: DefineComponent<any, any, any>
}

export type Btn = {
  title: string
  handleFn: () => void
}

export type Component = DefineComponent<any, any, any>
