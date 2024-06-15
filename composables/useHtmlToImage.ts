import { toPng } from 'html-to-image'

export default function useHtmlToImage(): {
  png: (node: HTMLElement) => Promise<string>
} {
  return { png }
}

async function png(node: HTMLElement): Promise<string> {
  const dataUrl = await toPng(node)

  return dataUrl
}
