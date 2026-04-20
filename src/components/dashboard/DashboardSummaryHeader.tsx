import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type DashboardSummaryHeaderProps = {
  greeting: string;
  subtitle: string;
  hasNotification?: boolean;
  onNotificationPress?: () => void;
};

export default function DashboardSummaryHeader({
  greeting,
  subtitle,
  hasNotification,
  onNotificationPress,
}: DashboardSummaryHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text allowFontScaling={false} style={styles.greetingText}>{greeting}</Text>
        <Text allowFontScaling={false} style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <Pressable
        onPress={onNotificationPress}
        style={({ pressed }) => [styles.notificationButton, pressed ? styles.notificationPressed : null]}
      >
        <Feather color="#4B5563" name="bell" size={18} />
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
  textWrap: {
    flex: 1,
    gap: 4,
  },
  greetingText: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 27,
  },
  subtitleText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
  },
  notificationButton: {
    alignItems: "center",
    backgroundColor: "#EEF0F3",
    borderRadius: 999,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  notificationPressed: {
    opacity: 0.8,
  },
  notificationDot: {
    backgroundColor: "#EF4444",
    borderColor: COLORS.white,
    borderRadius: 999,
    borderWidth: 1,
    height: 9,
    position: "absolute",
    right: 10,
    top: 8,
    width: 9,
  },
});