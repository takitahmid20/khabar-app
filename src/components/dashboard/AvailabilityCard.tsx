import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { COLORS } from "../../constants";

type AvailabilityCardProps = {
  active: boolean;
  onToggle: (nextValue: boolean) => void;
};

export default function AvailabilityCard({ active, onToggle }: AvailabilityCardProps) {
  return (
    <Pressable
      onPress={() => onToggle(!active)}
      style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}
    >
      <View style={styles.leftWrap}>
        <View style={styles.iconWrap}>
          <Feather color={COLORS.primarySoft} name={active ? "play" : "pause"} size={20} />
        </View>

        <View style={styles.textWrap}>
          <Text allowFontScaling={false} style={styles.titleText}>{active ? "Accepting Orders" : "Paused"}</Text>
          <Text allowFontScaling={false} style={styles.subtitleText}>{active ? "Tap to pause" : "Tap to accept"}</Text>
        </View>
      </View>

      <Switch
        onValueChange={onToggle}
        thumbColor={COLORS.white}
        trackColor={{ false: "#D1D5DB", true: COLORS.primarySoft }}
        value={active}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#E8F5EC",
    borderColor: "#74C69D",
    borderRadius: 20,
    borderWidth: 1.2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.88,
  },
  leftWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: "#CBE8D5",
    borderRadius: 16,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  textWrap: {
    gap: 4,
  },
  titleText: {
    color: "#1F2937",
    fontSize: 20 / 1.25,
    fontWeight: "800",
    lineHeight: 20,
  },
  subtitleText: {
    color: "#5AAE7E",
    fontSize: 15 / 1.25,
    fontWeight: "500",
    lineHeight: 18,
  },
});