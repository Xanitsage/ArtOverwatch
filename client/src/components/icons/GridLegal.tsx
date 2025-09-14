import type { IconProps } from './types'

export function GridLegal({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      focusable="false"
    >
      {/* Quadratic legal/document icon - strict 8px grid only */}
      <rect x="0" y="0" width="24" height="24" fill="none" />
      <rect x="8" y="8" width="8" height="8" fill="none" />
      <rect x="8" y="16" width="8" height="8" fill="none" />
    </svg>
  )
}