// Theme configuration types
export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeBorderRadius {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ThemeFontFamily {
  sans: string;
  mono: string;
}

export interface ThemeScale {
  normal: number;
  large: number;
  extraLarge: number;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeAnimation {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  easeSpring: string;
  easeSmooth: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  borderRadius: ThemeBorderRadius;
  fontFamily: ThemeFontFamily;
  fontMode: FontMode;
  scale: ThemeScale;
  spacing: ThemeSpacing;
  shadows: ThemeShadows;
  animation: ThemeAnimation;
  components: ComponentsConfig;
}

export type ScaleMode = 'normal' | 'large' | 'extraLarge';
export type FontMode = 'inter' | 'lora' | 'jetbrains-mono' | 'system';
export type RadiusKey = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

// Component-specific configs
export interface ButtonConfig {
  borderRadius: RadiusKey;
  defaultSize: 'sm' | 'md' | 'lg';
  defaultVariant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
}

export interface InputConfig {
  borderRadius: RadiusKey;
  defaultSize: 'sm' | 'md' | 'lg';
}

export interface SelectConfig {
  borderRadius: RadiusKey;
  defaultSize: 'sm' | 'md' | 'lg';
}

export interface CardConfig {
  borderRadius: RadiusKey;
  defaultVariant: 'default' | 'glass' | 'outline' | 'elevated';
  defaultPadding: 'none' | 'sm' | 'md' | 'lg';
}

export interface ModalConfig {
  borderRadius: RadiusKey;
  defaultSize: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ToastConfig {
  borderRadius: RadiusKey;
}

export interface IconButtonConfig {
  borderRadius: RadiusKey;
  defaultSize: 'sm' | 'md' | 'lg';
}

export interface BadgeConfig {
  borderRadius: RadiusKey;
}

export interface AvatarConfig {
  defaultSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface SwitchConfig {
  defaultSize: 'sm' | 'md';
}

export interface ComponentsConfig {
  button: ButtonConfig;
  input: InputConfig;
  select: SelectConfig;
  card: CardConfig;
  modal: ModalConfig;
  toast: ToastConfig;
  iconButton: IconButtonConfig;
  badge: BadgeConfig;
  avatar: AvatarConfig;
  switch: SwitchConfig;
}
