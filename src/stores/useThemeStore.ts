import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { themeConfig } from '@/config';
import type { ScaleMode, FontMode, ThemeConfig, ComponentsConfig, ThemeColors } from '@/config';

export type ThemeMode = 'light' | 'dark' | 'system';

// Deep partial type for component overrides
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface ThemeState {
  // Theme mode (light/dark/system)
  mode: ThemeMode;
  theme: ThemeMode; // Alias for backwards compatibility
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: ThemeMode) => void; // Alias for backwards compatibility

  // Scale for accessibility (normal/large/extraLarge)
  scaleMode: ScaleMode;
  setScaleMode: (scale: ScaleMode) => void;

  // Get current scale multiplier
  getScale: () => number;

  // Font mode
  fontMode: FontMode;
  setFontMode: (mode: FontMode) => void;

  // Theme config with runtime overrides
  config: ThemeConfig & { components: DeepPartial<ComponentsConfig> };

  // Update component config at runtime
  updateComponentConfig: <K extends keyof ComponentsConfig>(
    component: K,
    updates: Partial<ComponentsConfig[K]>
  ) => void;

  // Update theme colors
  updateColors: (colors: Partial<ThemeColors>) => void;

  // Reset component config to defaults
  resetComponentConfig: (component?: keyof ComponentsConfig) => void;
}

/**
 * Apply theme to document root
 */
const applyThemeMode = (mode: ThemeMode) => {
  const root = window.document.documentElement;

  if (mode === 'system') {
    root.classList.remove('light', 'dark');
  } else {
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
  }
};

/**
 * Apply scale to document root for accessibility
 */
const applyScale = (scaleMode: ScaleMode) => {
  const root = window.document.documentElement;
  const scale = themeConfig.scale[scaleMode];

  root.style.setProperty('--ui-scale', scale.toString());
  root.style.fontSize = `${16 * scale}px`;
};

/**
 * Apply font mode to document root
 */
const applyFontMode = (fontMode: FontMode) => {
  const root = window.document.documentElement;
  let fontStack = themeConfig.fontFamily.sans;

  switch (fontMode) {
    case 'inter':
      fontStack = "Inter, system-ui, -apple-system, sans-serif";
      break;
    case 'lora':
      fontStack = "Lora, Georgia, 'Times New Roman', serif";
      break;
    case 'jetbrains-mono':
      fontStack = "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace";
      break;
    case 'system':
      fontStack = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      break;
  }

  root.style.setProperty('--font-sans', fontStack);
  // Also set directly on body to bypass Tailwind v4's @theme layer specificity
  document.body.style.fontFamily = fontStack;
};

/**
 * Apply theme config CSS variables
 * Uses base themeConfig to ensure all values are present
 */
const applyThemeConfig = (config?: Partial<ThemeConfig>) => {
  const root = window.document.documentElement;

  // Always use base config as source of truth
  const colors = config?.colors ?? themeConfig.colors;
  const borderRadius = config?.borderRadius ?? themeConfig.borderRadius;
  const fontFamily = config?.fontFamily ?? themeConfig.fontFamily;
  const shadows = config?.shadows ?? themeConfig.shadows;
  const animation = config?.animation ?? themeConfig.animation;

  // Colors
  Object.entries(colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--color-${cssKey}`, value);
  });

  // Border Radius
  Object.entries(borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });

  // Font Family (only mono - sans is handled by applyFontMode)
  root.style.setProperty('--font-mono', fontFamily.mono);

  // Shadows
  Object.entries(shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });

  // Animation
  root.style.setProperty('--duration-fast', animation.durationFast);
  root.style.setProperty('--duration-normal', animation.durationNormal);
  root.style.setProperty('--duration-slow', animation.durationSlow);
  root.style.setProperty('--ease-spring', animation.easeSpring);
  root.style.setProperty('--ease-smooth', animation.easeSmooth);
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      theme: 'system',
      scaleMode: 'normal',
      fontMode: 'inter',
      config: themeConfig as ThemeConfig,

      setMode: (mode: ThemeMode) => {
        applyThemeMode(mode);
        set({ mode, theme: mode });
      },

      setTheme: (theme: ThemeMode) => {
        applyThemeMode(theme);
        set({ mode: theme, theme });
      },

      setScaleMode: (scaleMode: ScaleMode) => {
        applyScale(scaleMode);
        set({ scaleMode });
      },

      setFontMode: (fontMode: FontMode) => {
        applyFontMode(fontMode);
        set({ fontMode });
      },

      getScale: () => {
        const { scaleMode, config } = get();
        return config.scale[scaleMode];
      },

      updateComponentConfig: (component, updates) => {
        set((state) => ({
          config: {
            ...state.config,
            components: {
              ...state.config.components,
              [component]: {
                ...state.config.components[component],
                ...updates,
              },
            },
          },
        }));
      },

      updateColors: (colors) => {
        set((state) => {
          const newConfig = {
            ...state.config,
            colors: {
              ...state.config.colors,
              ...colors,
            },
          };
          applyThemeConfig(newConfig);
          return { config: newConfig };
        });
      },

      resetComponentConfig: (component) => {
        if (component) {
          const currentConfig = get().config;
          set({
            config: {
              ...currentConfig,
              components: {
                ...currentConfig.components,
                [component]: themeConfig.components[component],
              },
            } as ThemeConfig,
          });
        } else {
          const currentConfig = get().config;
          set({
            config: {
              ...currentConfig,
              components: themeConfig.components,
            } as ThemeConfig,
          });
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mode: state.mode,
        scaleMode: state.scaleMode,
        fontMode: state.fontMode,
        // Also persist component config and colors overrides
        config: {
          components: state.config.components,
          colors: state.config.colors,
        },
      }),
      merge: (persistedState: any, currentState) => {
        // Deep merge config to ensure we don't lose defaults (like colors) if they weren't persisted
        return {
          ...currentState,
          ...persistedState,
          config: {
            ...themeConfig,
            ...persistedState.config,
            components: {
              ...themeConfig.components,
              ...(persistedState.config?.components || {}),
            },
            colors: {
              ...themeConfig.colors,
              ...(persistedState.config?.colors || {}),
            },
          },
        };
      },
    }
  )
);

/**
 * Initialize theme on app start
 */
export const initializeTheme = () => {
  const { mode, scaleMode, fontMode, config } = useThemeStore.getState();
  applyThemeMode(mode);
  applyScale(scaleMode);
  applyFontMode(fontMode);
  applyThemeConfig(config);
};

// Legacy export for backwards compatibility
export const applyTheme = applyThemeMode;

/**
 * Helper to get merged component config (base + overrides)
 * Always returns valid config by falling back to base themeConfig
 */
export function getComponentConfig<K extends keyof ComponentsConfig>(
  component: K
): ComponentsConfig[K] {
  const { config } = useThemeStore.getState();
  const baseConfig = themeConfig.components[component];
  const overrides = config?.components?.[component];

  return {
    ...baseConfig,
    ...overrides,
  } as ComponentsConfig[K];
}

/**
 * Static mapping of radius keys to Tailwind classes
 * Required because Tailwind cannot compile dynamic class names like `rounded-${key}`
 */
export const radiusClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
} as const;

export type RadiusKey = keyof typeof radiusClasses;

/**
 * Get the Tailwind class for a radius key
 */
export function getRadiusClass(radiusKey: string): string {
  return radiusClasses[radiusKey as RadiusKey] ?? 'rounded-md';
}

/**
 * Static mapping for component sizes
 */
export const sizeClasses = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

export type SizeKey = keyof typeof sizeClasses;

/**
 * Static mapping for button variants
 */
export const buttonVariantClasses = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  danger: 'danger',
  outline: 'outline',
} as const;

export type ButtonVariantKey = keyof typeof buttonVariantClasses;

/**
 * Static mapping for card variants
 */
export const cardVariantClasses = {
  default: 'default',
  glass: 'glass',
  outline: 'outline',
  elevated: 'elevated',
} as const;

export type CardVariantKey = keyof typeof cardVariantClasses;

/**
 * Static mapping for card padding
 */
export const paddingClasses = {
  none: 'none',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

export type PaddingKey = keyof typeof paddingClasses;

/**
 * Get a validated size value
 */
export function getSize(sizeKey: string): SizeKey {
  return (sizeClasses[sizeKey as SizeKey] ?? 'md') as SizeKey;
}

/**
 * Get a validated button variant value  
 */
export function getButtonVariant(variantKey: string): ButtonVariantKey {
  return (buttonVariantClasses[variantKey as ButtonVariantKey] ?? 'primary') as ButtonVariantKey;
}

/**
 * Get a validated card variant value
 */
export function getCardVariant(variantKey: string): CardVariantKey {
  return (cardVariantClasses[variantKey as CardVariantKey] ?? 'default') as CardVariantKey;
}

/**
 * Get a validated padding value
 */
export function getPadding(paddingKey: string): PaddingKey {
  return (paddingClasses[paddingKey as PaddingKey] ?? 'md') as PaddingKey;
}

