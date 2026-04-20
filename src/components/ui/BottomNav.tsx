import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { COLORS, SPACING } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

export type BottomNavItem = {
  key: string;
  label: string;
  iconName: FeatherIconName;
  onPress?: () => void;
  disabled?: boolean;
};

type BottomNavProps = {
  items: BottomNavItem[];
  activeKey: string;
  onItemPress?: (item: BottomNavItem, index: number) => void;
  maxVisibleItems?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function BottomNav({
  items,
  activeKey,
  onItemPress,
  maxVisibleItems = 5,
  containerStyle,
}: BottomNavProps) {
  const isScrollable = items.length > maxVisibleItems;

  const handlePress = (item: BottomNavItem, index: number) => {
    if (item.disabled) {
      return;
    }

    onItemPress?.(item, index);
    item.onPress?.();
  };

  const renderNavItem = (item: BottomNavItem, index: number) => {
    const isActive = item.key === activeKey;

    return (
      <View
        key={item.key}
        style={[styles.itemWrap, isScrollable ? styles.scrollableItemWrap : styles.rowItemWrap]}
      >
        <View style={[styles.topIndicator, isActive ? styles.topIndicatorActive : null]} />

        <Pressable
          disabled={item.disabled}
          onPress={() => handlePress(item, index)}
          style={({ pressed }) => [
            styles.itemButton,
            item.disabled ? styles.itemDisabled : null,
            pressed && !item.disabled ? styles.itemPressed : null,
          ]}
        >
          <Feather
            color={isActive ? COLORS.primarySoft : COLORS.textMuted}
            name={item.iconName}
            size={22}
          />
          <Text
            allowFontScaling={false}
            style={[
              styles.itemLabel,
              isActive ? styles.itemLabelActive : styles.itemLabelInactive,
              item.disabled ? styles.itemLabelDisabled : null,
            ]}
          >
            {item.label}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {isScrollable ? (
        <ScrollView
          contentContainerStyle={styles.scrollRow}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {items.map(renderNavItem)}
        </ScrollView>
      ) : (
        <View style={styles.row}>{items.map(renderNavItem)}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderTopWidth: 1,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  scrollRow: {
    paddingHorizontal: SPACING.xs,
  },
  itemWrap: {
    alignItems: "center",
  },
  rowItemWrap: {
    flex: 1,
  },
  scrollableItemWrap: {
    minWidth: 88,
  },
  topIndicator: {
    backgroundColor: "transparent",
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    height: 3,
    marginBottom: 8,
    width: 42,
  },
  topIndicatorActive: {
    backgroundColor: COLORS.primarySoft,
  },
  itemButton: {
    alignItems: "center",
    gap: 8,
    minHeight: 68,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  itemPressed: {
    opacity: 0.75,
  },
  itemDisabled: {
    opacity: 0.45,
  },
  itemLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  itemLabelActive: {
    color: COLORS.primarySoft,
    fontWeight: "700",
  },
  itemLabelInactive: {
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  itemLabelDisabled: {
    color: COLORS.textMuted,
  },
});