import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type DashboardHeaderProps = {
  location: string;
  greeting: string;
  onNotificationPress?: () => void;
  hasNotification?: boolean;
};

export default function DashboardHeader({
  location,
  greeting,
  onNotificationPress,
  hasNotification,
}: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftBlock}>
        <View style={styles.locationRow}>
          <Feather color={COLORS.primarySoft} name="map-pin" size={12} />
          <Text allowFontScaling={false} style={styles.locationText}>{location}</Text>
          <Feather color={COLORS.textMuted} name="chevron-right" size={14} />
        </View>

        <Text allowFontScaling={false} style={styles.greetingText}>{greeting}</Text>
      </View>

      <Pressable
        onPress={onNotificationPress}
        style={({ pressed }) => [styles.notificationButton, pressed ? styles.notificationPressed : null]}
      >
        <Feather color={COLORS.textSecondary} name="bell" size={18} />
        {hasNotification ? <View style={styles.notificationDot} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftBlock: {
    gap: 2,
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  locationText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
  },
  greetingText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  notificationButton: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  notificationPressed: {
    opacity: 0.8,
  },
  notificationDot: {
    backgroundColor: "#EF4444",
    borderColor: COLORS.white,
    borderRadius: 999,
    borderWidth: 1,
    height: 8,
    position: "absolute",
    right: 9,
    top: 8,
    width: 8,
  },
});