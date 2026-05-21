import EmojiActivityScreen from "../../components/EmojiActivityScreen";
import { GRADIENTS } from "../../constants";

const VEHICLES = [
  { name: "Car", emoji: "🚗" },
  { name: "Bus", emoji: "🚌" },
  { name: "Airplane", emoji: "✈️" },
  { name: "Train", emoji: "🚂" },
  { name: "Boat", emoji: "🚢" },
  { name: "Helicopter", emoji: "🚁" },
  { name: "Bicycle", emoji: "🚲" },
  { name: "Fire Truck", emoji: "🚒" },
];

export default function VehiclesScreen() {
  return (
    <EmojiActivityScreen
      items={VEHICLES}
      gradient={GRADIENTS.sky}
      questionLabel="Find this vehicle!"
      activityName="Vehicles"
      completionMessage="Amazing! You found all the vehicles!"
    />
  );
}
