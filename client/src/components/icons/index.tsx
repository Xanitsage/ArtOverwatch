import { GridHome } from './GridHome'
import { GridTreasury } from './GridTreasury'
import { GridProjects } from './GridProjects'
import { GridIP } from './GridIP'
import { GridCommunity } from './GridCommunity'
import { GridAnalytics } from './GridAnalytics'
import { GridLegal } from './GridLegal'
import { GridSettings } from './GridSettings'
import type { IconProps } from './types'

// Icon registry for The Grid Atelier
// All icons are 24x24, axis-aligned, and follow strict 8px grid system
const iconRegistry = {
  home: GridHome,
  treasury: GridTreasury,
  projects: GridProjects,
  ip: GridIP,
  community: GridCommunity,
  analytics: GridAnalytics,
  legal: GridLegal,
  settings: GridSettings,
} as const

export type IconName = keyof typeof iconRegistry

interface IconComponentProps {
  name: IconName
  className?: string
  size?: number
}

export function Icon({ name, className = '', size = 24 }: IconComponentProps) {
  const IconComponent = iconRegistry[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`)
    return null
  }
  
  return <IconComponent className={className} size={size} />
}

// Export individual icons for direct use
export {
  GridHome,
  GridTreasury,
  GridProjects,
  GridIP,
  GridCommunity,
  GridAnalytics,
  GridLegal,
  GridSettings,
}

// Export the registry for external use
export { iconRegistry }