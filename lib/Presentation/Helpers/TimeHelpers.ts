const formatMsToSeconds = (value: number) => new Date(value).getSeconds().toString().padStart(2, '0')
const formatMsToMinutes = (value: number) => new Date(value).getMinutes().toString().padStart(2, '0')

export function formatTime(value: number): string {
  if (value >= 0) {
    return `${formatMsToMinutes(value)}:${formatMsToSeconds(value)}`
  } else {
    return "--:--"
  }
}