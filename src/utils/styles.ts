export type ThemeColor = (typeof themeColors)[keyof typeof themeColors];

export const themeColors = {
  blue: "rgb(45, 164, 255)",
  indigo: "rgb(99, 102, 241)",
  purple: "rgb(168, 85, 247)",
  red: "rgb(255, 52, 52)",
  orange: "rgb(255, 149, 0)",
  amber: "rgb(245, 158, 11)",
  teal: "rgb(20, 184, 166)",
  cyan: "rgb(34, 211, 238)",
  green: "rgb(16, 185, 129)",
  slate: "rgb(100, 116, 139)",
};

export const colors = {
  offWhite: "rgb(240,240,240)",
  lighterGray: "rgb(226, 226, 227)",
  lightGray: "rgb(197,197,197)",
  gray: "rgb(150,150,150)",
  darkGray: "rgb(92, 92, 92)",

  red: "rgb(255, 52, 52)",
  green: "rgb(12, 185, 0)",
  blue: "rgb(45, 164, 255)",
};

export const fontSizes = {
  text: 16,
  subText: 15,
  small: 12,
  large: 0,
  extraLarge: 30,
};
