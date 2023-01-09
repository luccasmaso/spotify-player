import { prominent } from 'color.js'

export async function getColorsFromImage(imageElement: HTMLImageElement): Promise<any> {
  const colors = await prominent(imageElement, { format: 'hex' })
  return colors[0]
}

export function lightOrDark(hex: string): 'light'|'dark' {
  const [r, g, b] = hexToRgb(hex)

  const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  )

  return hsp > 127.5 ? 'light' : 'dark'
}

function hexToRgb(hex: string): [number, number, number] {
  var bigint = parseInt(hex.substring(1), 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return [r, g, b]
}