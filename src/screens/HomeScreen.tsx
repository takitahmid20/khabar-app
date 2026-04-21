import { StackActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  DashboardBottomMenu,
  type DashboardBottomMenuTabKey,
  DashboardSummaryHeader,
  IncomingOrderCard,
  QuickActionCard,
  RecentOrderRow,
  StatCard,
  VerificationBanner,
  SectionHeaderRow,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { StatusToggleCard } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [hasIncomingOrder, setHasIncomingOrder] = useState(true);

  const switchRootScreen = (screenName: keyof RootStackParamList) => {
    navigation.dispatch(StackActions.replace(screenName));
  };

  const handleBottomTabPress = (tabKey: DashboardBottomMenuTabKey) => {
    if (tabKey === "dashboard") {
      return;
    }

    if (tabKey === "orders") {
      switchRootScreen("CookOrders");
      return;
    }

    if (tabKey === "menu") {
      switchRootScreen("CookMenu");
      return;
    }

    if (tabKey === "earnings") {
      switchRootScreen("CookEarnings");
      return;
    }

    if (tabKey === "profile") {
      switchRootScreen("CookProfile");
    }
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DashboardSummaryHeader
          greeting="Good afternoon, Rina"
          hasNotification
          subtitle="Here's what's happening today"
        />

        <StatusToggleCard
          containerStyle={styles.availabilityCard}
          disabledState={{
            containerBackgroundColor: "#E8F5EC",
            containerBorderColor: "#74C69D",
            iconBackgroundColor: "#CBE8D5",
            iconColor: "#2D6A4F",
            iconName: "pause",
            subtitle: "Tap to accept",
            subtitleColor: "#5AAE7E",
            title: "Paused",
            titleColor: "#1F2937",
            trackColor: "#2D6A4F",
          }}
          enabled={acceptingOrders}
          enabledState={{
            containerBackgroundColor: "#E8F5EC",
            containerBorderColor: "#74C69D",
            iconBackgroundColor: "#CBE8D5",
            iconColor: "#2D6A4F",
            iconName: "play",
            subtitle: "Tap to pause",
            subtitleColor: "#5AAE7E",
            title: "Accepting Orders",
            titleColor: "#1F2937",
            trackColor: "#2D6A4F",
          }}
          iconContainerSize={58}
          iconSize={20}
          onToggle={setAcceptingOrders}
          pressToToggle
          subtitleStyle={styles.availabilitySubtitleText}
          titleStyle={styles.availabilityTitleText}
        />

        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <StatCard
                iconName="package"
                iconTone="green"
                subtitle="↑ 3 from yesterday"
                subtitleTone="positive"
                title="Today's Orders"
                value="8"
              />
            </View>

            <View style={styles.statsItem}>
              <StatCard
                iconName="trending-up"
                iconTone="yellow"
                subtitle="After 10% platform fee"
                subtitleTone="positive"
                title="Today's Revenue"
                value="Tk 1,440"
              />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <StatCard
                iconName="star"
                iconTone="yellow"
                subtitle="Based on 234 reviews"
                title="Quality Score"
                value="4.8"
              />
            </View>

            <View style={styles.statsItem}>
              <StatCard
                iconName="clock"
                iconTone="purple"
                subtitle="↓ 5 min faster"
                title="Avg. Prep Time"
                value="32"
                suffix="min"
              />
            </View>
          </View>
        </View>

        <VerificationBanner
          message="Your documents are under review. Your profile will go live once approved."
          title="Verification Pending"
        />

        <View style={styles.newOrderHeaderRow}>
          <View style={styles.newOrderTitleWrap}>
            <View style={styles.newOrderDot} />
            <Text allowFontScaling={false} style={styles.newOrderTitleText}>New Orders</Text>
            <View style={styles.newOrderCountBadge}>
              <Text allowFontScaling={false} style={styles.newOrderCountText}>{hasIncomingOrder ? "1" : "0"}</Text>
            </View>
          </View>
        </View>

        {hasIncomingOrder ? (
          <IncomingOrderCard
            amountLabel="Tk 120"
            customerName="Nusrat J."
            locationLabel="Kalabagan, Dhaka"
            onAcceptPress={() => setHasIncomingOrder(false)}
            onRejectPress={() => setHasIncomingOrder(false)}
            orderSummary="1× Chicken Curry Set"
            timeLabel="8 min ago"
          />
        ) : (
          <View style={styles.emptyOrderCard}>
            <Text allowFontScaling={false} style={styles.emptyOrderText}>No new orders right now</Text>
          </View>
        )}

        <SectionHeaderRow title="Quick Actions" />

        <View style={styles.quickActionsRow}>
          <QuickActionCard
            iconName="package"
            iconTone="green"
            onPress={() => switchRootScreen("CookOrders")}
            subtitle="3 active"
            title="View Orders"
          />
          <QuickActionCard
            iconName="book-open"
            iconTone="blue"
            onPress={() => switchRootScreen("CookMenu")}
            subtitle="Today's menu"
            title="Edit Menu"
          />
        </View>

        <SectionHeaderRow
          actionLabel="View all"
          rightContent={
            <Pressable style={({ pressed }) => [styles.viewAllButton, pressed ? styles.viewAllPressed : null]}>
              <Text allowFontScaling={false} style={styles.viewAllText}>View all</Text>
              <Feather color={COLORS.primarySoft} name="arrow-right" size={16} />
            </Pressable>
          }
          title="Recent Orders"
        />

        <View style={styles.recentOrdersList}>
          <RecentOrderRow
            amountLabel="Tk 440"
            datetimeLabel="Today, 12:30 PM"
            status="active"
            title="Kacchi Biryani"
          />
          <RecentOrderRow
            amountLabel="Tk 170"
            datetimeLabel="Yesterday, 1:15 PM"
            status="delivered"
            title="Beef Halim"
          />
        </View>
      </ScrollView>

      <DashboardBottomMenu activeKey="dashboard" containerStyle={styles.bottomNav} onTabPress={handleBottomTabPress} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F3F4F6",
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: SPACING.md,
  },
  scrollContent: {
    gap: 14,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  availabilityCard: {
    borderRadius: 20,
    borderWidth: 1.2,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  availabilityTitleText: {
    fontSize: 20 / 1.25,
    fontWeight: "800",
    lineHeight: 20,
  },
  availabilitySubtitleText: {
    fontSize: 15 / 1.25,
    fontWeight: "500",
    lineHeight: 18,
  },
  statsGrid: {
    gap: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statsItem: {
    flex: 1,
  },
  newOrderHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newOrderTitleWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  newOrderDot: {
    backgroundColor: "#EF4444",
    borderRadius: 999,
    height: 11,
    width: 11,
  },
  newOrderTitleText: {
    color: "#0F172A",
    fontSize: 32 / 2,
    fontWeight: "800",
    lineHeight: 21,
  },
  newOrderCountBadge: {
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 999,
    height: 28,
    justifyContent: "center",
    minWidth: 28,
    paddingHorizontal: 8,
  },
  newOrderCountText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  emptyOrderCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 110,
  },
  emptyOrderText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  viewAllButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  viewAllPressed: {
    opacity: 0.8,
  },
  viewAllText: {
    color: COLORS.primarySoft,
    fontSize: 15 / 1.15,
    fontWeight: "700",
    lineHeight: 21 / 1.15,
  },
  recentOrdersList: {
    gap: 10,
  },
  bottomNav: {
    marginTop: "auto",
  },
});
