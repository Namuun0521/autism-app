import EmojiActivityScreen from "../../components/EmojiActivityScreen";
import { GRADIENTS } from "../../constants";

const CLOTHING = [
  { name: "T-Shirt", emoji: "👕" },
  { name: "Pants", emoji: "👖" },
  { name: "Sneakers", emoji: "👟" },
  { name: "Jacket", emoji: "🧥" },
  { name: "Hat", emoji: "🧢" },
  { name: "Gloves", emoji: "🧤" },
  { name: "Scarf", emoji: "🧣" },
  { name: "Dress", emoji: "👗" },
];

export default function ClothingScreen() {
  return (
    <EmojiActivityScreen
      items={CLOTHING}
      gradient={GRADIENTS.brand}
      questionLabel="Find this clothing!"
      activityName="Clothing"
      completionMessage="Amazing! You found all the clothes!"
    />
  );
}
