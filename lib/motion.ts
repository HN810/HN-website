export const easePrimary = [0.16, 1, 0.3, 1] as const
export const easeInOut = [0.76, 0, 0.24, 1] as const

export const duration = {
  reveal: 0.9,
  fast: 0.35,
  counter: 1.4,
} as const

export const stagger = 0.06

export const revealBlock = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const revealLine = {
  hidden: { y: '110%' },
  visible: { y: '0%' },
}
