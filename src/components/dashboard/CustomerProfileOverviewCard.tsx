import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type CustomerProfileStat = {
  key: string;
  value: string;
  label: string;
};

type CustomerProfileOverviewCardProps = {
  name: string;
  phoneLabel: string;
  verificationLabel: string;
  avatarInitial: string;
  stats: CustomerProfileStat[];
  onActionPress?: () => void;
};

export default function CustomerProfileOverviewCard({
  name,
  phoneLabel,
  verificationLabel,
  avatarInitial,
  stats,
  onActionPress,
}: CustomerProfileOverviewCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.identityRow}>
          <View style={styles.avatarWrap}>
            <Text allowFontScaling={false} style={styles.avatarText}>{avatarInitial}</Text>

            <View style={styles.verifiedBadge}>
              <Feather color={COLORS.white} name="check" size={12} />
            </View>
          </View>

          <View style={styles.nameWrap}>
            <Text allowFontScaling={false} style={styles.nameText}>{name}</Text>
            <Text allowFontScaling={false} style={styles.phoneText}>{phoneLabel}</Text>

            <View style={styles.verifiedRow}>
              <View style={styles.verifiedDot} />
              <Text allowFontScaling={false} style={styles.verifiedText}>{verificationLabel}</Text>
            </View>
          </View>
        </View>

        <Pressable onPress={onActionPress} style={({ pressed }) => [styles.actionButton, pressed ? styles.pressed : null]}>
          <Feather color="#6B7280" name="chevron-down" size={19} />
        </Pressable>
      </View>

      <View style={styles.statsWrap}>
        {stats.map((entry) => (
          <View key={entry.key} style={styles.statCell}>
            <Text allowFontScaling={false} style={styles.statValue}>{entry.value}</Text>
            <Text allowFontScaling={false} style={styles.statLabel}>{entry.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  identityRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginRight: 8,
  },
  avatarWrap: {
    alignItems: "center",
    backgroundColor: "#C8E7D0",
    borderRadius: 20,
    height: 80,
    justifyContent: "center",
    position: "relative",
    width: 80,
  },
  avatarText: {
    color: "#2D6A4F",
    fontSize: 46 / 1.6,
    fontWeight: "800",
    lineHeight: 30,
  },
  verifiedBadge: {
    alignItems: "center",
    backgroundColor: "#2D6A4F",
    borderColor: COLORS.white,
    borderRadius: 999,
    borderWidth: 2,
    bottom: -4,
    height: 28,
    justifyContent: "center",
    position: "absolute",
    right: -4,
    width: 28,
  },
  nameWrap: {
    marginLeft: 16,
  },
  nameText: {
    color: "#111827",
    fontSize: 32 / 1.45,
    fontWeight: "800",
    lineHeight: 26,
  },
  phoneText: {
    color: "#6B7280",
    fontSize: 17 / 1.2,
    fontWeight: "500",
    lineHeight: 19,
    marginTop: 2,
  },
  verifiedRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  verifiedDot: {
    backgroundColor: "#2D6A4F",
    borderRadius: 999,
    height: 12,
    width: 12,
  },
  verifiedText: {
    color: "#2D6A4F",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  pressed: {
    opacity: 0.82,
  },
  statsWrap: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    flexDirection: "row",
    marginTop: 14,
    minHeight: 82,
    paddingHorizontal: 6,
  },
  statCell: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  statValue: {
    color: "#111827",
    fontSize: 35 / 1.65,
    fontWeight: "800",
    lineHeight: 22,
  },
  statLabel: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    marginTop: 6,
  },
});