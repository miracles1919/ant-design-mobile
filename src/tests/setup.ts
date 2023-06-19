import '@testing-library/jest-dom'
import { reduceMotion } from '../utils/reduce-and-restore-motion'
import { mockGlobalStyles } from './mock-global-styles'
import { vi } from 'vitest'

mockGlobalStyles()
reduceMotion()

vi.mock('../utils/convert-px', () => {
  return {
    convertPx: vi.fn(px => px),
  }
})

// https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
const { getComputedStyle } = window
window.getComputedStyle = el => getComputedStyle(el)

// with jest-canvas-mock
;(globalThis as any).jest = vi
await import('jest-canvas-mock')
