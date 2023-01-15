export const artwork = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: .15, ease: 'easeIn' }
  }
}

export const buttonFeedback = {
  hidden: { transform: 'scale(0.5)' },
  visible: {
    transform: 'scale(1)'
  }
}

export const miniLayout = {
  hidden: { opacity: 0, bottom: -50 },
  visible: {
    bottom: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'backOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

export const immersiveLayout = {
  hidden: { opacity: 0, bottom: -200 },
  visible: {
    bottom: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: 'easeIn' }
  }
}