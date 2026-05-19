import EmojiActivityScreen from "../../components/EmojiActivityScreen";
import { GRADIENTS } from "../../constants";

const BODY_PARTS = [
  { name: "Eye",   emoji: "👁️" },
  { name: "Nose",  emoji: "👃" },
  { name: "Mouth", emoji: "👄" },
  { name: "Ear",   emoji: "👂" },
  { name: "Hand",  emoji: "🤚" },
  { name: "Foot",  emoji: "🦶" },
  { name: "Arm",   emoji: "💪" },
  { name: "Leg",   emoji: "🦵" },
];

export default function BodyPartsScreen() {
  return (
    <EmojiActivityScreen
      items={BODY_PARTS}
      gradient={GRADIENTS.teal}
      questionLabel="Which body part is this?"
      activityName="BodyParts"
      completionMessage="You know all your body parts!"
      getSpeechText={(x) => `Where is your ${x.name}?`}
    />
  );
}
