import EmojiActivityScreen from "../../components/EmojiActivityScreen";
import { GRADIENTS } from "../../constants";

const SHAPES = [
  { name: "Circle", emoji: "🔵" },
  { name: "Square", emoji: "🟥" },
  { name: "Triangle", emoji: "🔺" },
  { name: "Star", emoji: "⭐" },
  { name: "Heart", emoji: "❤️" },
  { name: "Diamond", emoji: "💎" },
  { name: "Rectangle", emoji: "🟦" },
  { name: "Oval", emoji: "🥚" },
];

export default function ShapesScreen() {
  return (
    <EmojiActivityScreen
      items={SHAPES}
      gradient={GRADIENTS.violet}
      questionLabel="Find this shape!"
      activityName="Shapes"
      completionMessage="Amazing! You found all the shapes!"
    />
  );
}

