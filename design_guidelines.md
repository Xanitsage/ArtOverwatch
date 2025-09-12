# ArtOverwatch Design Guidelines

## Design Approach
**Apple Human Interface Guidelines (HIG) Adaptation** - Following Apple's design principles for a clean, content-focused iOS-style interface with dark backgrounds, vibrant accent colors, and polished spacing. Emphasizing clarity, deference, and depth with modern dark UI aesthetics.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary (Default):**
- Background: 20 14% 4% (rich dark brown-black)
- Card: 20 14% 8% (elevated dark surfaces)
- Foreground: 45 25% 91% (warm white text)
- Primary: 9 75% 61% (vibrant coral-red for CTAs)
- Secondary: 30 15% 52% (muted warm gray)

**Light Mode:**
- Background: 45 25% 97% (warm off-white)
- Card: 0 0% 6% (dark cards on light)
- Primary: 0 0% 96% (light gray for buttons)
- Foreground: 0 0% 6% (dark text)

**Chart Colors:**
- Chart-1: 204 88% 53% (vibrant blue)
- Chart-2: 160 100% 36% (emerald green)
- Chart-3: 42 93% 56% (golden yellow)
- Chart-4: 147 79% 42% (forest green)
- Chart-5: 341 75% 51% (magenta pink)

### B. Typography
**Primary Font:** Inter with fallbacks to system fonts
- Headers: 600 weight, 2.5rem to 1.125rem range
- Body: 400 weight, 1rem base, 1.6 line height
- Captions: 500 weight, 0.875rem for metadata
- Mono: Menlo for code elements

### C. Layout System
**Tailwind Spacing:** Primary units of 4, 6, 8, 12, 16
- Card padding: p-6 for standard cards, p-8 for main containers
- Section margins: mb-8 for separation, mb-4 for components
- Grid gaps: gap-6 for layouts, gap-4 for forms
- Border radius: 0.4rem (rounded-md equivalent)

### D. Component Library

**Navigation:**
- Dark sidebar with coral-red primary accent (9 75% 61%)
- Pill-shaped category buttons with subtle backgrounds
- Clean iOS-style tab navigation with proper touch targets

**Cards & Progress:**
- Dark elevated cards (20 14% 8%) with subtle borders
- Circular progress rings in vibrant colors (green 160 100% 36%, purple 280 75% 55%)
- Clean typography hierarchy within cards

**Forms & Inputs:**
- Dark input fields (20 14% 18%) with warm borders
- Floating labels and grouped sections
- Primary coral-red buttons for main actions

**Data Displays:**
- Clean dark tables with warm accent borders
- Card-based metrics with prominent colorful numbers
- Simple charts using defined chart color palette

**Interactive Elements:**
- Hover states with subtle opacity changes
- Focus rings using primary coral-red color
- Minimal shadows for depth without distraction

### E. Animations
**iOS-Style Motion:**
- Subtle 200ms ease transitions
- Gentle scale transforms (0.95-1.0) for touch feedback
- Smooth fade-ins for progressive disclosure
- No complex animations - focus on polished micro-interactions

## Key Design Principles

1. **iOS Dark Aesthetic:** Rich dark backgrounds with vibrant accent colors
2. **Professional Polish:** Clean spacing and typography conveying business capability  
3. **Content-First:** Information hierarchy prioritizing artist data and metrics
4. **Touch-Optimized:** Proper sizing and spacing for mobile interactions
5. **High Contrast:** Excellent readability with warm whites on dark surfaces
6. **Vibrant Accents:** Strategic use of coral-red primary and colorful chart elements

## Images
**No Large Hero Image:** This interface focuses on dashboard-style layouts with cards and data visualization rather than large hero sections
**Profile Elements:** Small circular artist profile photos within cards
**Project Thumbnails:** Square artwork thumbnails in grid layouts  
**Icon Elements:** Clean system-style icons throughout the interface
**Background Patterns:** Subtle dark textures or gradients to add depth without distraction

This design creates a sophisticated, iOS-inspired platform that feels both artistic and business-focused, using rich dark themes with strategic pops of vibrant color for an engaging creative professional experience.