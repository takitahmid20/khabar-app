import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type VerificationBannerProps = {
  title: string;
  message: string;
};

export default function VerificationBanner({ title, message }: VerificationBannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftWrap}>
        <View style={styles.leadingIconWrap}>
          <Feather color="#C27803" name="alert-circle" size={18} />
        </View>

        <View style={styles.textWrap}>
          <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
          <Text allowFontScaling={false} style={styles.messageText}>{message}</Text>
        </View>
      </View>

      <View style={styles.trailingIconWrap}>
        <Feather color="#C27803" name="award" size={16} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF3C7",
    borderColor: "#F2D06C",
    borderRadius: 20,
    borderWidth: 1.2,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  leftWrap: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  leadingIconWrap: {
    marginTop: 2,
  },
  textWrap: {
    flex: 1,
    gap: 5,
  },
  titleText: {
    color: "#9A4C16",
    fontSize: 30 / 2,
    fontWeight: "800",
    lineHeight: 20,
  },
  messageText: {
    color: "#B15E22",
    fontSize: 15 / 1.15,
    fontWeight: "500",
    lineHeight: 23 / 1.15,
  },
  trailingIconWrap: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 2,
  },
});