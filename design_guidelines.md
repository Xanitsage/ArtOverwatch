# ArtOverwatch Design Guidelines

## Design Approach
**Apple Human Interface Guidelines (HIG) Adaptation** - Following Apple's design principles for a clean, content-focused experience that translates well from native iOS to web. Emphasizing clarity, deference, and depth.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 210 100% 95% (light blue-gray background), 220 15% 25% (dark text)
- Dark Mode: 220 15% 15% (dark background), 210 20% 90% (light text)

**Brand Colors:**
- Primary: 220 90% 56% (vibrant blue for CTAs and highlights)
- Success: 142 76% 36% (green for positive actions)
- Warning: 38 92% 50% (amber for alerts)

**Corporate Aesthetic:**
- Professional gradient overlays using subtle blue-to-purple transitions (220 90% 56% to 250 80% 60%)
- Clean, high-contrast interface emphasizing trust and reliability

### B. Typography
**Primary Font:** SF Pro Display (system font) with fallbacks to -apple-system, BlinkMacSystemFont
- Headers: 600 weight, sizes from 2.5rem to 1.125rem
- Body: 400 weight, 1rem base size, 1.6 line height
- Captions: 500 weight, 0.875rem for metadata

### C. Layout System
**Tailwind Spacing:** Primary units of 4, 6, 8, 12, 16
- Consistent padding: p-6 for cards, p-8 for main containers
- Margins: mb-8 for section separation, mb-4 for component spacing
- Grid gaps: gap-6 for card layouts, gap-4 for form elements

### D. Component Library

**Navigation:**
- Clean tab bar with SF Symbols-inspired icons
- Minimal top navigation with clear hierarchy
- Sidebar navigation for desktop with collapsible sections

**Cards & Containers:**
- Subtle shadows and rounded corners (rounded-lg)
- Card-based layout for projects, IP assets, and financial data
- Glass morphism effects for overlay components

**Forms:**
- Clean, floating label inputs
- Grouped form sections with clear visual separation
- Minimal button styles with emphasis on primary actions

**Data Displays:**
- Clean tables with subtle borders
- Card-based metrics with prominent numbers
- Simple charts focusing on clarity over decoration

**Overlays:**
- Modal dialogs with backdrop blur
- Sheet-style bottom panels for mobile
- Minimal popover menus

### E. Animations
**Minimal Motion:**
- Subtle fade transitions (200ms ease)
- Gentle scale transforms for interactive elements
- No complex animations - focus on smooth, purposeful micro-interactions

## Key Design Principles

1. **Corporate Professionalism:** Clean, trustworthy interface that conveys business capability
2. **Content-First:** Information hierarchy prioritizes artist data and project details
3. **Mobile-Responsive:** iOS-optimized touch targets and gestures
4. **Accessibility:** High contrast ratios and clear visual hierarchy
5. **Scalability:** Modular components that work across different screen sizes

## Images
**Hero Section:** Large hero image showcasing artistic workspace or creative tools, with blurred background overlay buttons using backdrop-blur
**Project Cards:** Thumbnail images for artwork and projects
**Profile Areas:** Artist profile photos and brand logo displays
**Dashboard Icons:** Clean, minimal icons for different business functions (treasury, IP, projects)

This design creates a professional platform that feels both artistic and business-capable, following Apple's design philosophy while serving the unique needs of creative entrepreneurs.