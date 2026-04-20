import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

export type MealSlot = "Breakfast" | "Lunch" | "Dinner";

export type MenuDish = {
  id: string;
  name: string;
  category: string;
  mealSlot: MealSlot;
  price: number;
  imageUri: string;
  available: boolean;
  cutoffLabel: string;
  description?: string;
};

type MenuDishCardProps = {
  dish: MenuDish;
  onViewPress?: () => void;
  onEditPress?: () => void;
  onDeletePress?: () => void;
  onToggleAvailabilityPress?: () => void;
};

export default function MenuDishCard({
  dish,
  onViewPress,
  onEditPress,
  onDeletePress,
  onToggleAvailabilityPress,
}: MenuDishCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: dish.imageUri }} style={styles.image} />

      <View style={styles.contentWrap}>
        <View style={styles.topRow}>
          <View style={styles.titleWrap}>
            <Text allowFontScaling={false} numberOfLines={2} style={styles.nameText}>
              {dish.name}
            </Text>
            <Text allowFontScaling={false} style={styles.categoryText}>
              {dish.category}
            </Text>

            <View style={styles.mealSlotPill}>
              <Text allowFontScaling={false} style={styles.mealSlotText}>{dish.mealSlot}</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <ActionIconButton iconName="eye" onPress={onViewPress} tone="green" />
            <ActionIconButton iconName="edit-2" onPress={onEditPress} tone="neutral" />
            <ActionIconButton iconName="trash-2" onPress={onDeletePress} tone="red" />
          </View>
        </View>

        <Text allowFontScaling={false} style={styles.priceText}>{`Tk ${dish.price}`}</Text>

        <View style={styles.metaRow}>
          <View style={[styles.statusPill, dish.available ? styles.statusPillAvailable : styles.statusPillUnavailable]}>
            <Text allowFontScaling={false} style={[styles.statusText, dish.available ? styles.statusTextAvailable : styles.statusTextUnavailable]}>
              {dish.available ? "Active" : "Inactive"}
            </Text>
          </View>

          <Pressable
            onPress={onToggleAvailabilityPress}
            style={({ pressed }) => [
              styles.toggleButton,
              dish.available ? styles.toggleButtonDeactivate : styles.toggleButtonActivate,
              pressed ? styles.actionPressed : null,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.toggleButtonText,
                dish.available ? styles.toggleButtonTextDeactivate : styles.toggleButtonTextActivate,
              ]}
            >
              {dish.available ? "Deactivate" : "Activate"}
            </Text>
          </Pressable>

          <View style={styles.cutoffWrap}>
            <Feather color="#9CA3AF" name="clock" size={11} />
            <Text allowFontScaling={false} style={styles.cutoffText}>{dish.cutoffLabel}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

type ActionIconButtonProps = {
  iconName: React.ComponentProps<typeof Feather>["name"];
  tone: "green" | "neutral" | "red";
  onPress?: () => void;
};

function ActionIconButton({ iconName, tone, onPress }: ActionIconButtonProps) {
  const palette =
    tone === "green"
      ? { backgroundColor: "#E8F5EC", color: COLORS.primarySoft }
      : tone === "red"
        ? { backgroundColor: "#FFF1F2", color: "#EF4444" }
        : { backgroundColor: "#EEF0F3", color: "#6B7280" };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        { backgroundColor: palette.backgroundColor },
        pressed ? styles.actionPressed : null,
      ]}
    >
      <Feather color={palette.color} name={iconName} size={13} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  image: {
    borderRadius: 12,
    height: 76,
    width: 76,
  },
  contentWrap: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleWrap: {
    flex: 1,
    marginRight: 6,
    minWidth: 0,
  },
  nameText: {
    color: "#111827",
    fontSize: 23 / 1.3,
    fontWeight: "800",
    lineHeight: 20,
  },
  categoryText: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 14,
  },
  mealSlotPill: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    marginTop: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  mealSlotText: {
    color: "#3730A3",
    fontSize: 9.5,
    fontWeight: "700",
    lineHeight: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 6,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 8,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  actionPressed: {
    opacity: 0.8,
  },
  priceText: {
    color: COLORS.primarySoft,
    fontSize: 18 / 1.25,
    fontWeight: "800",
    lineHeight: 22,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusPillAvailable: {
    backgroundColor: "#D8F3DC",
  },
  statusPillUnavailable: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 9.5,
    fontWeight: "700",
    lineHeight: 12,
  },
  statusTextAvailable: {
    color: COLORS.primarySoft,
  },
  statusTextUnavailable: {
    color: "#B91C1C",
  },
  toggleButton: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 22,
    paddingHorizontal: 9,
  },
  toggleButtonActivate: {
    backgroundColor: "#D8F3DC",
  },
  toggleButtonDeactivate: {
    backgroundColor: "#FFF1F2",
  },
  toggleButtonText: {
    fontSize: 9.5,
    fontWeight: "700",
    lineHeight: 12,
  },
  toggleButtonTextActivate: {
    color: COLORS.primarySoft,
  },
  toggleButtonTextDeactivate: {
    color: "#B91C1C",
  },
  cutoffWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  cutoffText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
  },
});