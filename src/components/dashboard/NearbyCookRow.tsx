import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type NearbyCookRowProps = {
  dishImageUri: string;
  avatarUri: string;
  cookName: string;
  areaLabel: string;
  rating: string;
  reviewCount: string;
  etaLabel: string;
  distanceLabel: string;
  cuisines: string[];
  priceLabel: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
};

export default function NearbyCookRow({
  dishImageUri,
  avatarUri,
  cookName,
  areaLabel,
  rating,
  reviewCount,
  etaLabel,
  distanceLabel,
  cuisines,
  priceLabel,
  onPress,
  onFavoritePress,
}: NearbyCookRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}>
      <Image source={{ uri: dishImageUri }} style={styles.dishImage} />

      <View style={styles.contentWrap}>
        <View style={styles.topRow}>
          <View style={styles.identityRow}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />

            <View style={styles.identityTextWrap}>
              <View style={styles.nameRow}>
                <Text allowFontScaling={false} style={styles.nameText}>{cookName}</Text>
                <View style={styles.verifiedBadge}>
                  <Feather color={COLORS.primarySoft} name="check" size={9} />
                </View>
              </View>
              <Text allowFontScaling={false} style={styles.areaText}>{areaLabel}</Text>
            </View>
          </View>

          <Pressable onPress={onFavoritePress} style={({ pressed }) => [styles.favoriteButton, pressed ? styles.favoritePressed : null]}>
            <Feather color="#D1D5DB" name="heart" size={14} />
          </Pressable>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MaterialIcons color="#FBBF24" name="star" size={12} />
            <Text allowFontScaling={false} style={styles.metaText}>{`${rating} (${reviewCount})`}</Text>
          </View>
          <Text allowFontScaling={false} style={styles.dotText}>•</Text>
          <View style={styles.metaItem}>
            <Feather color="#9CA3AF" name="clock" size={12} />
            <Text allowFontScaling={false} style={styles.metaText}>{etaLabel}</Text>
          </View>
          <Text allowFontScaling={false} style={styles.dotText}>•</Text>
          <Text allowFontScaling={false} style={styles.metaText}>{distanceLabel}</Text>
        </View>

        <View style={styles.cuisineRow}>
          {cuisines.map((cuisine) => (
            <View key={`${cookName}-${cuisine}`} style={styles.cuisineTag}>
              <Text allowFontScaling={false} style={styles.cuisineText}>{cuisine}</Text>
            </View>
          ))}

          <Text allowFontScaling={false} style={styles.priceText}>{priceLabel}</Text>
        </View>
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
    flexDirection: "row",
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.93,
  },
  dishImage: {
    height: 118,
    width: 84,
  },
  contentWrap: {
    flex: 1,
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  identityRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  avatar: {
    borderRadius: 999,
    height: 26,
    width: 26,
  },
  identityTextWrap: {
    gap: 1,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  nameText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  verifiedBadge: {
    alignItems: "center",
    backgroundColor: "#E8F5EC",
    borderRadius: 999,
    height: 12,
    justifyContent: "center",
    width: 12,
  },
  areaText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
  },
  favoriteButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  favoritePressed: {
    opacity: 0.8,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  metaItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  dotText: {
    color: "#9CA3AF",
    fontSize: 10,
    lineHeight: 12,
  },
  metaText: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
  },
  cuisineRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  cuisineTag: {
    backgroundColor: "#E8F5EC",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  cuisineText: {
    color: COLORS.primarySoft,
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 12,
  },
  priceText: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 12,
    marginLeft: 2,
  },
});