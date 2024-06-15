import type { Database } from './supabase/types'

export type Quote = SnakeToCamelCaseNested<Database['public']['Tables']['quote']['Row']>
export type Book = SnakeToCamelCaseNested<Database['public']['Tables']['book']['Row']>
export type Subscription = SnakeToCamelCaseNested<Database['public']['Tables']['subscription']['Row']>

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

export type SnakeToCamelCaseNested<T> = T extends object
  ? T extends (infer U)[]
    ? U extends object
      ? {
          [K in keyof U as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<U[K]>
        }[]
      : T
    : {
        [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>
      }
  : T

export type QuoteInsert = {
  text: Quote['text']
  book: Book['name'] | null
  pageNumber: Quote['pageNumber']
}
