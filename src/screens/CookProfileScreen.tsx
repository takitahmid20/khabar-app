import { StackActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  DashboardBottomMenu,
  type DashboardBottomMenuTabKey,
  LogoutConfirmSheet,
  ProfileOverviewCard,
  ProfileSettingRow,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { Card, StatusToggleCard } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type SettingItem = {
  key: string;
  title: string;
  subtitle: string;
  iconName: React.ComponentProps<typeof ProfileSettingRow>["iconName"];
  tone: React.ComponentProps<typeof ProfileSettingRow>["tone"];
  badgeLabel?: string;
  onPress?: () => void;
};

export default function CookProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [holidayMode, setHolidayMode] = useState(false);
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);

  const switchRootScreen = (screenName: keyof RootStackParamList) => {
    navigation.dispatch(StackActions.replace(screenName));
  };

  const mainSettings: SettingItem[] = useMemo(
    () => [
      {
        key: "verification",
        title: "Verification Status",
        subtitle: "Pending approval",
        iconName: "shield",
        tone: "amber",
        badgeLabel: "PENDING",
        onPress: () => navigation.navigate("CookIdentityVerification"),
      },
      {
        key: "service",
        title: "Service Area",
        subtitle: "Dhanmondi - 3 km radius",
        iconName: "map-pin",
        tone: "green",
        onPress: () => navigation.navigate("CookServiceArea"),
      },
      {
        key: "hours",
        title: "Operating Hours",
        subtitle: "Mon-Fri, 10 AM-2 PM",
        iconName: "clock",
        tone: "purple",
      },
      {
        key: "bank",
        title: "Bank & Payout Settings",
        subtitle: "bKash ending 8763",
        iconName: "dollar-sign",
        tone: "mint",
        onPress: () => navigation.navigate("CookPayout"),
      },
      {
        key: "notifications",
        title: "Notifications",
        subtitle: "Order alerts, payouts",
        iconName: "bell",
        tone: "blue",
      },
      {
        key: "privacy",
        title: "Privacy & Safety",
        subtitle: "Data management",
        iconName: "lock",
        tone: "slate",
      },
      {
        key: "app",
        title: "App Settings",
        subtitle: "Language, theme",
        iconName: "settings",
        tone: "slate",
      },
      {
        key: "help",
        title: "Help & Support",
        subtitle: "FAQs, live chat",
        iconName: "help-circle",
        tone: "mint",
      },
    ],
    [navigation],
  );

  const legalSettings = useMemo(
    () => [
      { key: "privacy-policy", label: "Privacy Policy" },
      { key: "terms", label: "Terms of Service" },
      { key: "cookies", label: "Cookie Policy" },
      { key: "about", label: "About Khabar" },
    ],
    [],
  );

  const profileStats = useMemo(
    () => [
      { label: "orders", value: "284", hint: "Orders" },
      { label: "reviews", value: "234", hint: "Reviews" },
      { label: "rating", value: "4.8", hint: "Rating" },
      { label: "month", value: "Tk 48K", hint: "This Month" },
    ],
    [],
  );

  const handleBottomTabPress = (tabKey: DashboardBottomMenuTabKey) => {
    if (tabKey === "dashboard") {
      switchRootScreen("Home");
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
      return;
    }
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ProfileOverviewCard
          avatarUri="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=60"
          name="Rina Begum"
          onProfilePress={() => navigation.navigate("CookProfileDetails")}
          phoneLabel="+8800182036560"
          ratingLabel="4.8"
          stats={profileStats}
          verificationLabel="PENDING VERIFICATION"
        />

        <StatusToggleCard
          containerStyle={styles.holidayCard}
          disabledState={{
            containerBackgroundColor: "#EAF6EF",
            containerBorderColor: "#C9E9D4",
            iconBackgroundColor: "#D9EFE2",
            iconColor: "#6B7280",
            iconName: "moon",
            subtitle: "Pause all orders temporarily",
            subtitleColor: "#6B7280",
            title: "Holiday Mode: OFF",
            titleColor: "#25644C",
            trackColor: "#F59E0B",
          }}
          enabled={holidayMode}
          enabledState={{
            containerBackgroundColor: "#FEF3C7",
            containerBorderColor: "#F5D487",
            iconBackgroundColor: "#FDE68A",
            iconColor: "#B45309",
            iconName: "moon",
            subtitle: "Pause all orders temporarily",
            subtitleColor: "#6B7280",
            title: "Holiday Mode: ON",
            titleColor: "#B45309",
            trackColor: "#F59E0B",
          }}
          iconContainerSize={22}
          iconSize={12}
          onToggle={setHolidayMode}
          subtitleStyle={styles.holidaySubtitleText}
          titleStyle={styles.holidayTitleText}
        />

        <Card style={styles.settingsCard}>
          {mainSettings.map((entry, index) => (
            <ProfileSettingRow
              badgeLabel={entry.badgeLabel}
              iconName={entry.iconName}
              key={entry.key}
              onPress={entry.onPress}
              showDivider={index < mainSettings.length - 1}
              subtitle={entry.subtitle}
              title={entry.title}
              tone={entry.tone}
            />
          ))}
        </Card>

        <Card style={styles.legalCard}>
          {legalSettings.map((entry, index) => (
            <Pressable
              key={entry.key}
              style={({ pressed }) => [styles.legalRow, pressed ? styles.pressed : null]}
            >
              <Text allowFontScaling={false} style={styles.legalText}>{entry.label}</Text>
              <Text allowFontScaling={false} style={styles.legalArrow}>›</Text>
              {index < legalSettings.length - 1 ? <View style={styles.legalDivider} /> : null}
            </Pressable>
          ))}
        </Card>

        <Pressable onPress={() => setShowLogoutSheet(true)} style={({ pressed }) => [styles.logoutCard, pressed ? styles.pressed : null]}>
          <View style={styles.logoutIconWrap}>
            <Text allowFontScaling={false} style={styles.logoutIcon}>↩</Text>
          </View>
          <Text allowFontScaling={false} style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>

      <DashboardBottomMenu activeKey="profile" containerStyle={styles.bottomNav} onTabPress={handleBottomTabPress} />

      <LogoutConfirmSheet
        onClose={() => setShowLogoutSheet(false)}
        onConfirm={() => {
          setShowLogoutSheet(false);
          switchRootScreen("Login");
        }}
        visible={showLogoutSheet}
      />
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
    gap: 10,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  holidayCard: {
    borderRadius: 12,
    minHeight: 56,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  holidayTitleText: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  holidaySubtitleText: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
    marginTop: 1,
  },
  settingsCard: {
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  legalCard: {
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  legalRow: {
    justifyContent: "center",
    minHeight: 48,
    position: "relative",
  },
  legalText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  legalArrow: {
    color: "#D1D5DB",
    fontSize: 16,
    fontWeight: "700",
    position: "absolute",
    right: 0,
    top: 16,
  },
  legalDivider: {
    backgroundColor: "#F3F4F6",
    bottom: 0,
    height: 1,
    left: 0,
    position: "absolute",
    right: 0,
  },
  logoutCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    minHeight: 40,
    paddingHorizontal: 12,
  },
  logoutIconWrap: {
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 999,
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  logoutIcon: {
    color: "#DC2626",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 12,
  },
  logoutText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.84,
  },
  bottomNav: {
    marginTop: "auto",
  },
});
