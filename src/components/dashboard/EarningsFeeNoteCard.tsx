import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type EarningsFeeNoteCardProps = {
  title: string;
  description: string;
};

export default function EarningsFeeNoteCard({ title, description }: EarningsFeeNoteCardProps) {
  return (
    <View style={styles.container}>
      <Feather color={COLORS.primarySoft} name="info" size={16} style={styles.icon} />

      <View style={styles.textWrap}>
        <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
        <Text allowFontScaling={false} style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EAF6EF",
    borderColor: "#C9E9D4",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  titleText: {
    color: "#25644C",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  descriptionText: {
    color: "#3B7D62",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
});
