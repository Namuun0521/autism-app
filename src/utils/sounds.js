import { Audio } from "expo-av";

export const playCorrect = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/sounds/correct.wav")
  );
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) sound.unloadAsync();
  });
};

export const playWrong = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/sounds/wrong.wav")
  );
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) sound.unloadAsync();
  });
};
