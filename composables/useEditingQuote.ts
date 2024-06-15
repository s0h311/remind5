import type { Quote, QuoteInsert } from '~/server/types'

export const useEditingQuote = () => useState<{ quote: Quote; index: number } | null>('editing-quote', () => null)
