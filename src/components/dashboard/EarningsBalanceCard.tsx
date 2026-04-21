import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type EarningsBalanceCardProps = {
  availableBalanceLabel: string;
  pendingSettlementLabel: string;
  onWithdrawPress?: () => void;
  onPayoutInfoPress?: () => void;
};

export default function EarningsBalanceCard({
  availableBalanceLabel,
  pendingSettlementLabel,
  onWithdrawPress,
  onPayoutInfoPress,
}: EarningsBalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text allowFontScaling={false} style={styles.labelText}>AVAILABLE BALANCE</Text>
      <Text allowFontScaling={false} style={styles.balanceText}>{availableBalanceLabel}</Text>

      <View style={styles.pendingRow}>
        <Feather color="#9FC8B6" name="clock" size={13} />
        <Text allowFontScaling={false} style={styles.pendingText}>{pendingSettlementLabel}</Text>
      </View>

      <View style={styles.actionsRow}>
        <ActionPill iconName="arrow-up-right" label="Withdraw" onPress={onWithdrawPress} tone="dark" />
        <ActionPill iconName="info" label="How payouts work" onPress={onPayoutInfoPress} tone="light" />
      </View>
    </View>
  );
}

type ActionPillProps = {
  iconName: React.ComponentProps<typeof Feather>["name"];
  label: string;
  tone: "dark" | "light";
  onPress?: () => void;
};

function ActionPill({ iconName, label, tone, onPress }: ActionPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionPill,
        tone === "dark" ? styles.actionPillDark : styles.actionPillLight,
        pressed ? styles.actionPillPressed : null,
      ]}
    >
      <Feather color={tone === "dark" ? "#E8F5EC" : "#134E3A"} name={iconName} size={14} />
      <Text allowFontScaling={false} style={[styles.actionPillText, tone === "dark" ? styles.actionPillTextDark : styles.actionPillTextLight]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#145B44",
    borderColor: "#1B7458",
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  labelText: {
    color: "#A6CCBD",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    lineHeight: 14,
  },
  balanceText: {
    color: COLORS.white,
    fontSize: 44 / 1.4,
    fontWeight: "800",
    lineHeight: 36,
  },
  pendingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  pendingText: {
    color: "#9FC8B6",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  actionPill: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 36,
    paddingHorizontal: 8,
  },
  actionPillDark: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  actionPillLight: {
    backgroundColor: "#53C58C",
  },
  actionPillPressed: {
    opacity: 0.85,
  },
  actionPillText: {
    fontSize: 17 / 1.3,
    fontWeight: "700",
    lineHeight: 18,
  },
  actionPillTextDark: {
    color: "#E8F5EC",
  },
  actionPillTextLight: {
    color: "#134E3A",
  },
});
