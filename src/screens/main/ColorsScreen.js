// import { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const COLORS = [
//   { name: "Red", hex: "#FF6B6B", emoji: "🔴" },
//   { name: "Blue", hex: "#87CEEB", emoji: "🔵" },
//   { name: "Yellow", hex: "#FFE66D", emoji: "🟡" },
//   { name: "Green", hex: "#95E77E", emoji: "🟢" },
//   { name: "Purple", hex: "#B8A9FF", emoji: "🟣" },
//   { name: "Orange", hex: "#FFA07A", emoji: "🟠" },
// ];

// export default function ColorsScreen() {
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [question, setQuestion] = useState(
//     COLORS[Math.floor(Math.random() * COLORS.length)],
//   );

//   const handleSelect = (color) => {
//     setSelected(color.name);
//     if (color.name === question.name) {
//       setScore(score + 1);
//       setTimeout(() => {
//         setSelected(null);
//         setQuestion(COLORS[Math.floor(Math.random() * COLORS.length)]);
//       }, 1000);
//     } else {
//       setTimeout(() => {
//         setSelected(null);
//       }, 1000);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.score}>⭐ {score}</Text>

//       <View style={styles.questionCard}>
//         <Text style={styles.questionText}>Find this color!</Text>
//         <View style={[styles.colorCircle, { backgroundColor: question.hex }]} />
//         <Text style={styles.colorName}>{question.name}</Text>
//       </View>

//       <View style={styles.grid}>
//         {COLORS.map((color) => (
//           <TouchableOpacity
//             key={color.name}
//             style={[
//               styles.colorCard,
//               { backgroundColor: color.hex },
//               selected === color.name && {
//                 borderWidth: 4,
//                 borderColor:
//                   color.name === question.name ? "#00C853" : "#FF1744",
//               },
//             ]}
//             onPress={() => handleSelect(color)}
//           >
//             <Text style={styles.colorEmoji}>{color.emoji}</Text>
//             <Text style={styles.colorLabel}>{color.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8F6FF", padding: 24 },
//   score: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "right",
//     marginBottom: 16,
//   },
//   questionCard: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 24,
//     alignItems: "center",
//     marginBottom: 32,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   questionText: { fontSize: 18, color: "#999", marginBottom: 16 },
//   colorCircle: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
//   colorName: { fontSize: 24, fontWeight: "bold", color: "#333" },
//   grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
//   colorCard: {
//     width: "47%",
//     borderRadius: 16,
//     padding: 20,
//     alignItems: "center",
//   },
//   colorEmoji: { fontSize: 32, marginBottom: 8 },
//   colorLabel: { fontSize: 16, fontWeight: "bold", color: "#333" },
// });

import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const COLORS = [
  { name: "Red", hex: "#FF6B6B", emoji: "🔴" },
  { name: "Blue", hex: "#87CEEB", emoji: "🔵" },
  { name: "Yellow", hex: "#FFE66D", emoji: "🟡" },
  { name: "Green", hex: "#95E77E", emoji: "🟢" },
  { name: "Purple", hex: "#B8A9FF", emoji: "🟣" },
  { name: "Orange", hex: "#FFA07A", emoji: "🟠" },
];

const TOTAL = 10;

export default function ColorsScreen() {
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(
    COLORS[Math.floor(Math.random() * COLORS.length)],
  );

  const handleSelect = (color) => {
    if (selected) return;
    setSelected(color.name);

    if (color.name === question.name) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore === TOTAL) {
        setTimeout(() => {
          Alert.alert("🎉 Amazing!", "You found all 10 colors!", [
            { text: "Go Home", onPress: () => router.back() },
          ]);
        }, 500);
      } else {
        setTimeout(() => {
          setSelected(null);
          setQuestion(COLORS[Math.floor(Math.random() * COLORS.length)]);
        }, 800);
      }
    } else {
      setTimeout(() => {
        setSelected(null);
      }, 800);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.progress}>
          {score} / {TOTAL} ⭐
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${(score / TOTAL) * 100}%` }]}
        />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>Find this color!</Text>
        <View style={[styles.colorCircle, { backgroundColor: question.hex }]} />
        <Text style={styles.colorName}>{question.name}</Text>
      </View>

      <View style={styles.grid}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color.name}
            style={[
              styles.colorCard,
              { backgroundColor: color.hex },
              selected === color.name && {
                borderWidth: 4,
                borderColor:
                  color.name === question.name ? "#00C853" : "#FF1744",
              },
            ]}
            onPress={() => handleSelect(color)}
          >
            <Text style={styles.colorEmoji}>{color.emoji}</Text>
            <Text style={styles.colorLabel}>{color.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F6FF", padding: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 16,
  },
  back: { fontSize: 16, color: "#6B4EFF", fontWeight: "bold" },
  progress: { fontSize: 18, fontWeight: "bold", color: "#333" },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 24,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#6B4EFF",
    borderRadius: 4,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  questionText: { fontSize: 18, color: "#999", marginBottom: 16 },
  colorCircle: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  colorName: { fontSize: 24, fontWeight: "bold", color: "#333" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  colorCard: {
    width: "47%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  colorEmoji: { fontSize: 32, marginBottom: 8 },
  colorLabel: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
