import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type CookOrderEmptyStateProps = {
  title?: string;
  message?: string;
};

export default function CookOrderEmptyState({
  title = "No new order orders",
  message = "New orders will appear here when customers place them.",
}: CookOrderEmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Feather color="#C5CAD3" name="package" size={28} />
      </View>
      <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
      <Text allowFontScaling={false} style={styles.messageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 320,
    paddingHorizontal: 22,
  },
  iconWrap: {
    marginBottom: 10,
  },
  titleText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    marginBottom: 4,
    textAlign: "center",
  },
  messageText: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 15,
    textAlign: "center",
  },
});