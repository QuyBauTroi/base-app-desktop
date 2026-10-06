---
name: ui-ux
description: Comprehensive guide to creating premium, high-performance UI/UX experiences using React and Tailwind CSS. Covers emotional design, micro-interactions, and adaptive themes.
---

# Premium UI/UX Design System

A design system and implementation guide for building "Apple-quality" or "Telegram-quality" web interfaces. This skill focuses on **perceived performance**, **emotional design**, and **tactile feedback**.

## When to Use This Skill

- When starting a new web application that requires a "native app" feel.
- When upgrading an existing UI to feel more premium and responsive.
- When implementing Dark Mode (specifically OLED/True Black patterns).
- When you need smooth animations, micro-interactions, or glassmorphism effects.

## Prerequisites

- **React** (v18+)
- **Tailwind CSS** (v4.0+)
- **Framer Motion** (recommended for spring animations)
- **Lucide React** or **Heroicons** (for iconography)

## Core Design Principles

1.  **Fluidity & Feedback**: Every interaction (click, hover, tap) must have an immediate visual response (<100ms).
2.  **Content-First**: Minimize UI chrome. Use negative space and typography to guide the eye.
3.  **Physical Materiality**: Use "Glassmorphism" (blur) for depth and "Spring Physics" for motion.
4.  **Emotional Connection**: Delight users with unexpected, playful micro-interactions.

---

## Critical Rules (Lessons Learned)

### 1. Tailwind CSS v4 - No Dynamic Class Names

> [!CAUTION]
> Tailwind CANNOT compile dynamic class names like `` `rounded-${radiusKey}` ``.

**Wrong:**
```tsx
const radiusClass = `rounded-${config.borderRadius}`; // ❌ Won't work
```

**Correct - Use Static Mapping:**
```tsx
// In your store or utils
export const radiusClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
} as const;

export function getRadiusClass(key: string): string {
  return radiusClasses[key as keyof typeof radiusClasses] ?? 'rounded-md';
}

// In component
const radiusClass = getRadiusClass(config.borderRadius); // ✅ Works
```

### 2. Always Use i18n Translation Keys

> [!IMPORTANT]
> NEVER hardcode text strings. Always use translation keys.

**Wrong:**
```tsx
<span>Đăng nhập với Google</span>  // ❌ Hardcoded
```

**Correct:**
```tsx
<span>{t('login.login_google')}</span>  // ✅ Translatable
```

### 3. Theme Store - Handle Undefined Config

> [!WARNING]
> When using Zustand persist middleware, stored config may be partial/undefined on first load.

**Wrong:**
```tsx
return {
  ...themeConfig.components[component],
  ...config.components[component],  // ❌ May crash if undefined
};
```

**Correct - Use Optional Chaining & Fallbacks:**
```tsx
const baseConfig = themeConfig.components[component];
const overrides = config?.components?.[component];  // ✅ Safe
return { ...baseConfig, ...overrides };
```

### 4. Icons - Centralize in @/components/icons

> [!NOTE]
> Define custom icons in `src/components/icons/` and export via barrel file.

```tsx
// src/components/icons/GoogleIcon.tsx
export function GoogleIcon({ className }: { className?: string }) {
  return <svg className={className}>...</svg>;
}

// src/components/icons/index.ts
export * from './LumiLogo';
export * from './GoogleIcon';

// Usage
import { GoogleIcon } from '@/components/icons';
```

### 5. Button with Icon - Prevent Layout Issues

> [!TIP]
> Use `flex items-center justify-center gap-*` and `shrink-0` on icons.

**Wrong:**
```tsx
<Button>
  <GoogleIcon /> // May cause 2-line layout
  Sign in with Google
</Button>
```

**Correct:**
```tsx
<button className="flex items-center justify-center gap-3">
  <GoogleIcon className="w-5 h-5 shrink-0" />
  <span>Sign in with Google</span>
</button>
```

### 6. Input Icon Sizing

> [!TIP]
> Pass `className="w-full h-full"` to icons inside Input components.

```tsx
<Input
  icon={<User className="w-full h-full" />}  // ✅ Scales properly
  placeholder="Username"
/>
```

### 7. Button - Always Use `icon` Prop

> [!CAUTION]
> NEVER pass icon elements directly as `children` of Button. Always use the `icon` prop.

The Button component has built-in `icon` and `iconPosition` props that handle sizing and alignment correctly via `shrink-0` and proper gap spacing.

**Wrong:**
```tsx
<Button className="gap-2">
  <Pencil className="w-4 h-4" />  {/* ❌ Icon as children - breaks layout */}
  Edit
</Button>
```

**Correct:**
```tsx
<Button icon={<Pencil className="w-4 h-4" />}>  {/* ✅ Uses icon prop */}
  Edit
</Button>
```

---

## Implementation Guide

### 1. Design Tokens (Tailwind v4 Theme)

Add these tokens to your main CSS file. They implement a semantic color system supporting OLED Dark Mode.

```css
@import "tailwindcss";

@theme {
  /* Semantic Color System */
  --color-primary: #008C4F; /* Active/Brand Color */
  --color-bg-base: #FFFFFF; /* Main Background */
  --color-bg-layer-1: #F1F1F1; /* Secondary/Grouped Background */
  --color-bg-layer-2: #EFEFEF; /* Inputs/Dividers */
  --color-text-main: #000000;
  --color-text-muted: #8E8E93;
  --color-success: #34C759;
  --color-destructive: #FF3B30;

  /* OLED Dark Mode Overrides */
  --color-primary-dark: #3E88F7;
  --color-bg-base-dark: #000000; /* True Black */
  --color-bg-layer-1-dark: #1C1C1D; /* Card/Group Background */
  --color-bg-layer-2-dark: #2C2C2E; /* Input Background */
  --color-text-main-dark: #FFFFFF;
  --color-text-muted-dark: #8E8E93;
}

/* Dynamic Root Variables */
:root {
  --bg-base: var(--color-bg-base);
  --bg-layer-1: var(--color-bg-layer-1);
  --text-main: var(--color-text-main);
  /* ... map others */
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-base: var(--color-bg-base-dark);
    --bg-layer-1: var(--color-bg-layer-1-dark);
    --text-main: var(--color-text-main-dark);
    /* ... map others */
  }
}
```

### 2. Interaction Utilities

Create these utility classes to standardize "feel".

```css
/* Tactile Active State (Shrink Effect) */
.active-press {
  @apply active:scale-[0.98] transition-transform duration-100 ease-out;
}

/* Glassmorphism Surface */
.glass-panel {
  @apply bg-(--bg-base)/80 backdrop-blur-md border-b border-white/10;
}
```

---

## Pattern Library (Examples)

### A. The "App Shell" Layout
A responsive layout acting as the foundation.

```tsx
<div className="flex h-screen w-full bg-(--bg-layer-1) text-(--text-main)">
  {/* Sidebar (Desktop) */}
  <aside className="hidden md:flex w-[320px] flex-col border-r border-(--bg-layer-2) bg-(--bg-base)">
    {/* List Content */}
  </aside>

  {/* Main View */}
  <main className="flex-1 relative flex flex-col overflow-hidden">
     {/* Header */}
     <header className="glass-panel absolute top-0 w-full h-14 z-10 flex items-center px-4">
       <h1 className="font-semibold text-lg">Title</h1>
     </header>
     
     {/* Scrollable Content */}
     <div className="flex-1 overflow-y-auto pt-14 pb-safe">
       {/* Page Content */}
     </div>
  </main>
</div>
```

### B. Grouped Settings List (iOS Style)
Common patterns for settings or data presentation.

```tsx
<div className="mx-4 my-6 space-y-4">
  <div className="overflow-hidden rounded-xl bg-(--bg-base) shadow-sm">
    <ListItem icon={<UserIcon />} label="Account" />
    <ListItem icon={<BellIcon />} label="Notifications" hasDivider />
    <ListItem icon={<ShieldIcon />} label="Privacy" />
  </div>
</div>

const ListItem = ({ icon, label, hasDivider }) => (
  <div className="active-press flex items-center p-4 cursor-pointer hover:bg-(--bg-layer-1) transition-colors relative">
    <div className="text-(--color-primary) mr-3">{icon}</div>
    <span className="flex-1 font-medium">{label}</span>
    {hasDivider && <div className="absolute bottom-0 right-0 left-12 h-[1px] bg-(--bg-layer-2)" />}
  </div>
);
```

### C. Skeleton Loading (Perceived Performance)
Use instead of spinners for initial load.

```tsx
<div className="animate-pulse space-y-4 p-4">
  <div className="h-4 w-1/3 bg-(--bg-layer-2) rounded" />
  <div className="space-y-2">
    <div className="h-20 w-full bg-(--bg-layer-2) rounded-xl" />
    <div className="h-20 w-full bg-(--bg-layer-2) rounded-xl" />
  </div>
</div>
```

---

## Best Practices

- **Avoid Linear Easing**: Use spring animations for UI elements (menus, modals) appearing on screen.
- **Micro-interactions**: Add a subtle bounce or color flash when a crucial action (like Save or Send) succeeds.
- **Scroll Physics**: Ensure scroll containers have `overscroll-behavior-y: none` or custom elastic scroll for a native feel.
- **Keep UI Simple**: Avoid too many animations or decorations. Clean > Fancy.
- **Test on Dark Mode**: Always verify components look good in both light and dark themes.
