import type { StyleProp, ViewStyle } from "react-native";

import { BottomNav, type BottomNavItem } from "../ui";

export type CookBottomMenuTabKey = "dashboard" | "orders" | "menu" | "earnings" | "profile";

type CookBottomMenuProps = {
  activeKey: CookBottomMenuTabKey;
  onTabPress?: (tabKey: CookBottomMenuTabKey) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const COOK_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: "dashboard", label: "Dashboard", iconName: "grid" },
  { key: "orders", label: "Orders", iconName: "clipboard" },
  { key: "menu", label: "Menu", iconName: "tool" },
  { key: "earnings", label: "Earnings", iconName: "dollar-sign" },
  { key: "profile", label: "Profile", iconName: "user" },
];

export default function CookBottomMenu({
  activeKey,
  onTabPress,
  containerStyle,
}: CookBottomMenuProps) {
  return (
    <BottomNav
      activeKey={activeKey}
      containerStyle={containerStyle}
      items={COOK_BOTTOM_NAV_ITEMS}
      onItemPress={(item) => onTabPress?.(item.key as CookBottomMenuTabKey)}
    />
  );
}
