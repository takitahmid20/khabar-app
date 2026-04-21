import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type ProfileStat = {
  label: string;
  value: string;
  hint: string;
};

type ProfileOverviewCardProps = {
  name: string;
  phoneLabel: string;
  ratingLabel: string;
  verificationLabel: string;
  avatarUri: string;
  stats: ProfileStat[];
  onProfilePress?: () => void;
};

export default function ProfileOverviewCard({
  name,
  phoneLabel,
  ratingLabel,
  verificationLabel,
  avatarUri,
  stats,
  onProfilePress,
}: ProfileOverviewCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.identityRow}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />

          <View style={styles.nameWrap}>
            <Text allowFontScaling={false} style={styles.nameText}>{name}</Text>
            <Text allowFontScaling={false} style={styles.phoneText}>{phoneLabel}</Text>

            <View style={styles.metaRow}>
              <View style={styles.ratingWrap}>
                <View style={styles.onlineDot} />
                <Text allowFontScaling={false} style={styles.ratingText}>{ratingLabel}</Text>
              </View>

              <View style={styles.verificationPill}>
                <Text allowFontScaling={false} style={styles.verificationText}>{verificationLabel}</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable onPress={onProfilePress} style={({ pressed }) => [styles.profileButton, pressed ? styles.pressed : null]}>
          <Feather color="#9CA3AF" name="user" size={15} />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        {stats.map((entry) => (
          <View key={entry.label} style={styles.statCell}>
            <Text allowFontScaling={false} style={styles.statValue}>{entry.value}</Text>
            <Text allowFontScaling={false} style={styles.statHint}>{entry.hint}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
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
  avatar: {
    borderRadius: 10,
    height: 36,
    width: 36,
  },
  nameWrap: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    color: "#111827",
    fontSize: 22 / 1.45,
    fontWeight: "800",
    lineHeight: 18,
  },
  phoneText: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
    marginTop: 2,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 3,
  },
  ratingWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  onlineDot: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.white,
    borderRadius: 999,
    borderWidth: 1,
    height: 8,
    width: 8,
  },
  ratingText: {
    color: "#374151",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 13,
  },
  verificationPill: {
    backgroundColor: "#FEF3C7",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  verificationText: {
    color: "#92400E",
    fontSize: 8,
    fontWeight: "800",
    lineHeight: 10,
  },
  profileButton: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  pressed: {
    opacity: 0.8,
  },
  statsRow: {
    borderTopColor: "#EEF0F3",
    borderTopWidth: 1,
    flexDirection: "row",
    paddingTop: 8,
  },
  statCell: {
    flex: 1,
    minWidth: 0,
  },
  statValue: {
    color: "#111827",
    fontSize: 17 / 1.35,
    fontWeight: "800",
    lineHeight: 16,
    textAlign: "center",
  },
  statHint: {
    color: "#9CA3AF",
    fontSize: 9,
    fontWeight: "500",
    lineHeight: 12,
    marginTop: 2,
    textAlign: "center",
  },
});
