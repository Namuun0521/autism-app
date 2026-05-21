import EmojiActivityScreen from "../../components/EmojiActivityScreen";
import { GRADIENTS } from "../../constants";

const ANIMALS = [
  { name: "Dog", emoji: "🐶" },
  { name: "Cat", emoji: "🐱" },
  { name: "Elephant", emoji: "🐘" },
  { name: "Lion", emoji: "🦁" },
  { name: "Rabbit", emoji: "🐰" },
  { name: "Penguin", emoji: "🐧" },
  { name: "Bear", emoji: "🐻" },
  { name: "Monkey", emoji: "🐵" },
];

export default function AnimalsScreen() {
  return (
    <EmojiActivityScreen
      items={ANIMALS}
      gradient={GRADIENTS.coral}
      questionLabel="Find this animal!"
      activityName="Animals"
      completionMessage="Amazing! You found all the animals!"
    />
  );
}
