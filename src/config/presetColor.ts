export interface PresetColor {
  name: string;
  i18nKey: string;
  value: string;
  light: string;
  dark: string;
}

export const PRESET_COLORS: PresetColor[] = [
  {
    name: "Xanh lá",
    i18nKey: "color_green",
    value: "#008C4F",
    light: "#00A85D",
    dark: "#006B3C",
  },
  {
    name: "Xanh dương",
    i18nKey: "color_blue",
    value: "#3E88F7",
    light: "#5E9EFF",
    dark: "#2C6ECB",
  },
  {
    name: "Tím",
    i18nKey: "color_purple",
    value: "#8E44AD",
    light: "#9B59B6",
    dark: "#7D3C98",
  },
  {
    name: "Cam",
    i18nKey: "color_orange",
    value: "#FF9500",
    light: "#FFA500",
    dark: "#E68600",
  },
  {
    name: "Đỏ",
    i18nKey: "color_red",
    value: "#E74C3C",
    light: "#EC7063",
    dark: "#C0392B",
  },
  {
    name: "Teal",
    i18nKey: "color_teal",
    value: "#1ABC9C",
    light: "#48C9B0",
    dark: "#16A085",
  },
  {
    name: "Xám",
    i18nKey: "color_gray",
    value: "#6C757D",
    light: "#2b3243",
    dark: "#495057",
  },
];