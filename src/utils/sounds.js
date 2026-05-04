import { Audio } from "expo-av";

const playSound = async (file) => {
  try {
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  } catch {
    // Sound failure should not interrupt gameplay
  }
};

export const playCorrect = () =>
  playSound(require("../../assets/sounds/correct.wav"));

export const playWrong = () =>
  playSound(require("../../assets/sounds/wrong.wav"));
