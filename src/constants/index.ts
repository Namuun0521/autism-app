import type { ColorValue } from "react-native";

export const CHILD_NAME_KEY = "child_name";
export const GAME_TOTAL = 10;

export const THEME = {
  brand: "#7C5CFC",
  brandDark: "#5B3FD4",
  brandLight: "#A78BFA",
  bg: "#F5F3FF",
  correct: "#00C853",
  wrong: "#FF3D57",
  correctBg: "#E6FAF0",
  wrongBg: "#FFE8EC",
  text: "#1A1A2E",
  textSub: "#6B7280",
  white: "#FFFFFF",
  card: "#FFFFFF",
  shadow: "#7C5CFC",
};

export type Gradient = [ColorValue, ColorValue, ...ColorValue[]];

export const GRADIENTS: Record<string, Gradient> = {
  brand:  ["#7C5CFC", "#A78BFA"],
  coral:  ["#FF6B9D", "#FF8A65"],
  mint:   ["#43E97B", "#38F9D7"],
  sky:    ["#4FACFE", "#00F2FE"],
  gold:   ["#F6D365", "#FDA085"],
  violet: ["#A18CD1", "#FBC2EB"],
  teal:   ["#0ED2F7", "#B2FEFA"],
  peach:  ["#FFECD2", "#FCB69F"],
  bg:     ["#EDE9FE", "#F5F3FF"],
};

export const ACTIVITIES: Array<{
  key: string;
  emoji: string;
  label: string;
  gradient: Gradient;
  route: string;
}> = [
  { key: "Colors",    emoji: "🎨", label: "Colors",     gradient: ["#FF6B9D", "#FF8A65"], route: "/Colors" },
  { key: "Letters",   emoji: "🔤", label: "Letters",    gradient: ["#4FACFE", "#00F2FE"], route: "/Letters" },
  { key: "Numbers",   emoji: "🔢", label: "Numbers",    gradient: ["#43E97B", "#38F9D7"], route: "/Numbers" },
  { key: "Emotions",  emoji: "😊", label: "Emotions",   gradient: ["#F6D365", "#FDA085"], route: "/Emotions" },
  { key: "Shapes",    emoji: "🔷", label: "Shapes",     gradient: ["#A18CD1", "#FBC2EB"], route: "/Shapes" },
  { key: "Animals",   emoji: "🐶", label: "Animals",    gradient: ["#FF9A9E", "#FECFEF"], route: "/Animals" },
  { key: "BodyParts",   emoji: "🤚", label: "Body Parts",   gradient: ["#0ED2F7", "#B2FEFA"], route: "/BodyParts" },
  { key: "BasicNeeds", emoji: "🙋", label: "Basic Needs",  gradient: ["#FFECD2", "#FCB69F"], route: "/BasicNeeds" },
  { key: "Clothing",  emoji: "👕", label: "Clothing",  gradient: ["#667EEA", "#764BA2"], route: "/Clothing" },
  { key: "Vehicles",  emoji: "🚗", label: "Vehicles",  gradient: ["#4FACFE", "#00F2FE"], route: "/Vehicles" },
];
