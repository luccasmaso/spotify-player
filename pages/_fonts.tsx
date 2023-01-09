import { Be_Vietnam_Pro } from '@next/font/google'

const sans = Be_Vietnam_Pro({ variable: '--font-sans', weight: ['400', '500', '600', '700'], preload: true, display: 'swap', subsets: ['latin'] })

export default function() { return `${sans.variable} font-sans` }