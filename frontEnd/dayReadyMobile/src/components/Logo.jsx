// Logotipo "DAY READY" dibujado con react-native-svg. Es un port directo
// del Logo.jsx original (que usaba <svg> de HTML): la "D" y la "Y" en texto
// grande, un sol dibujado a mano en medio y "READY" debajo en chico.
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { fonts } from "../theme/colors";

const SUN_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

function SunIcon({ size, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginTop: -4 }}>
      <Circle cx="12" cy="14" r="6" fill={color} />
      {SUN_ANGLES.slice(0, 8).map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 12 + 8.5 * Math.cos(rad);
        const y1 = 14 + 8.5 * Math.sin(rad);
        const x2 = 12 + 10.5 * Math.cos(rad);
        const y2 = 14 + 10.5 * Math.sin(rad);
        // Se recortan los rayos que quedarían por encima de la "línea de
        // horizonte" del sol, igual que en el diseño original.
        if (y1 > 8 && y2 > 8) return null;
        return (
          <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        );
      })}
      <Path d="M6 14 Q12 8 18 14" fill={color} />
    </Svg>
  );
}

export default function Logo({ color = "#E07B39", size = 1 }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.letter, { color, fontSize: 28 * size }]}>D</Text>
        <SunIcon size={22 * size} color={color} />
        <Text style={[styles.letter, { color, fontSize: 28 * size }]}>Y</Text>
      </View>
      <Text style={[styles.tagline, { color, fontSize: 10 * size }]}>READY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
  letter: { fontFamily: fonts.headingExtra, letterSpacing: -1 },
  tagline: { fontFamily: fonts.heading, letterSpacing: 3, marginTop: -4 },
});
