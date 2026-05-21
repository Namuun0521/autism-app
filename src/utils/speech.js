import * as Speech from "expo-speech";

export const speak = (text) => {
  try {
    Speech.stop();
    Speech.speak(text, { rate: 0.85, pitch: 1.1 });
  } catch (e) {
    console.warn("Speech failed:", e);
  }
};

export const stopSpeech = () => {
  try {
    Speech.stop();
  } catch (e) {
    console.warn("stopSpeech failed:", e);
  }
};
