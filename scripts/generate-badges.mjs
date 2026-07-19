import { mkdir, writeFile } from 'node:fs/promises'
import { makeBadge } from 'badge-maker'
import {
  siGmail,
  siGooglechrome,
  siTelegram,
  siLinkedin,
  siVk,
} from 'simple-icons'

const outputDirectory = new URL('../assets/badges/', import.meta.url)

function logoBase64(icon) {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">',
    `<path fill="#fff" d="${icon.path}"/>`,
    '</svg>',
  ].join('')

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

const badges = [
  {
    filename: 'email.svg',
    label: 'Email',
    message: 'lischenkodev@gmail.com',
    color: 'EA4335',
    icon: siGmail,
  },
  {
    filename: 'website.svg',
    label: 'Website',
    message: 'melod1n.github.io',
    color: '000000',
    icon: siGooglechrome,
  },
  {
    filename: 'website2.svg',
    label: 'Website',
    message: 'mlgt.ru',
    color: '0f0f3b',
    icon: siGooglechrome,
  },
  {
    filename: 'telegram.svg',
    label: 'Telegram',
    message: '@melod1n',
    color: '26A5E4',
    icon: siTelegram,
  },
  {
    filename: 'linkedin.svg',
    label: 'LinkedIn',
    message: 'melod1n',
    color: '0A66C2',
    icon: siLinkedin,
  },
  {
    filename: 'vk.svg',
    label: 'VK',
    message: '@melod1n',
    color: '0077FF',
    icon: siVk,
  },
]

await mkdir(outputDirectory, { recursive: true })

for (const badge of badges) {
  const svg = makeBadge({
    label: badge.label,
    message: badge.message,
    color: badge.color,
    style: 'flat',
    logoBase64: logoBase64(badge.icon),
    idSuffix: badge.filename.replace('.svg', ''),
  })

  await writeFile(new URL(badge.filename, outputDirectory), svg)
}
