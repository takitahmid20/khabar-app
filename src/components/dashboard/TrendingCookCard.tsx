import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type TrendingCookCardProps = {
  foodImageUri: string;
  cookName: string;
  areaLabel: string;
  ratingLabel: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
};

export default function TrendingCookCard({
  foodImageUri,
  cookName,
  areaLabel,
  ratingLabel,
  onPress,
  onFavoritePress,
}: TrendingCookCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: foodImageUri }} style={styles.image} />

        <View style={styles.ratingPill}>
          <Feather color="#FBBF24" name="star" size={10} />
          <Text allowFontScaling={false} style={styles.ratingText}>{ratingLabel}</Text>
        </View>

        <Pressable onPress={onFavoritePress} style={({ pressed }) => [styles.favoriteButton, pressed ? styles.favoritePressed : null]}>
          <Feather color="#9CA3AF" name="heart" size={14} />
        </Pressable>
      </View>

      <View style={styles.infoWrap}>
        <Text allowFontScaling={false} style={styles.nameText}>{cookName}</Text>
        <Text allowFontScaling={false} style={styles.areaText}>{areaLabel}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    width: 160,
  },
  pressed: {
    opacity: 0.92,
  },
  imageWrap: {
    height: 92,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  ratingPill: {
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.82)",
    borderRadius: 999,
    bottom: 6,
    flexDirection: "row",
    gap: 3,
    left: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    position: "absolute",
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 13,
  },
  favoriteButton: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 999,
    height: 24,
    justifyContent: "center",
    position: "absolute",
    right: 6,
    top: 6,
    width: 24,
  },
  favoritePressed: {
    opacity: 0.8,
  },
  infoWrap: {
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  nameText: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  areaText: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 14,
  },
});