import type { StyleProp, ViewStyle } from "react-native";

import { BottomNav, type BottomNavItem } from "../ui";

export type DashboardBottomMenuTabKey = "dashboard" | "orders" | "menu" | "earnings" | "profile";

type DashboardBottomMenuProps = {
  activeKey: DashboardBottomMenuTabKey;
  onTabPress?: (tabKey: DashboardBottomMenuTabKey) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const DASHBOARD_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: "dashboard", label: "Dashboard", iconName: "grid" },
  { key: "orders", label: "Orders", iconName: "clipboard" },
  { key: "menu", label: "Menu", iconName: "tool" },
  { key: "earnings", label: "Earnings", iconName: "dollar-sign" },
  { key: "profile", label: "Profile", iconName: "user" },
];

export default function DashboardBottomMenu({
  activeKey,
  onTabPress,
  containerStyle,
}: DashboardBottomMenuProps) {
  return (
    <BottomNav
      activeKey={activeKey}
      containerStyle={containerStyle}
      items={DASHBOARD_BOTTOM_NAV_ITEMS}
      onItemPress={(item) => onTabPress?.(item.key as DashboardBottomMenuTabKey)}
    />
  );
}
