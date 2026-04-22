import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  LogoutConfirmSheet,
  ProfileOverviewCard,
  ProfileSettingRow,
} from "../components/dashboard";
import { ProfileNameStepScreen } from "../components/flow";
import { ScreenContainer } from "../components/layout";
import { BottomNav, Card, type BottomNavItem } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type SettingItem = {
  key: string;
  title: string;
  subtitle: string;
  iconName: React.ComponentProps<typeof ProfileSettingRow>["iconName"];
  tone: React.ComponentProps<typeof ProfileSettingRow>["tone"];
  onPress?: () => void;
};

export default function CustomerProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CustomerProfile">>();
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);

  const isOnboardingMode = route.params?.mode === "onboarding";

  const switchRootScreen = (screenName: keyof RootStackParamList) => {
    navigation.dispatch(StackActions.replace(screenName));
  };

  const navItems: BottomNavItem[] = useMemo(
    () => [
      {
        key: "home",
        label: "Home",
        iconName: "home",
        onPress: () => switchRootScreen("CustomerDashboard"),
      },
      {
        key: "explore",
        label: "Explore",
        iconName: "search",
      },
      {
        key: "orders",
        label: "Orders",
        iconName: "clipboard",
      },
      {
        key: "profile",
        label: "Profile",
        iconName: "user",
      },
    ],
    [navigation],
  );

  const settings: SettingItem[] = useMemo(
    () => [
      {
        key: "address",
        title: "Saved Addresses",
        subtitle: "2 addresses",
        iconName: "map-pin",
        tone: "green",
      },
      {
        key: "payments",
        title: "Payment Methods",
        subtitle: "bKash, Nagad",
        iconName: "credit-card",
        tone: "purple",
      },
      {
        key: "subscription",
        title: "Subscription",
        subtitle: "Active - Weekday Lunch",
        iconName: "heart",
        tone: "rose",
      },
      {
        key: "reviews",
        title: "My Reviews",
        subtitle: "4 reviews written",
        iconName: "star",
        tone: "amber",
      },
      {
        key: "notifications",
        title: "Notifications",
        subtitle: "Manage alerts",
        iconName: "bell",
        tone: "blue",
      },
      {
        key: "privacy",
        title: "Privacy & Security",
        subtitle: "Password, data settings",
        iconName: "shield",
        tone: "slate",
      },
      {
        key: "app",
        title: "Settings",
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
    [],
  );

  const legalSettings = useMemo(
    () => [
      { key: "privacy-policy", label: "Privacy Policy" },
      { key: "terms", label: "Terms of Service" },
      { key: "refund", label: "Refund Policy" },
      { key: "about", label: "About Khabar" },
    ],
    [],
  );

  const profileStats = useMemo(
    () => [
      { label: "orders", value: "24", hint: "Orders" },
      { label: "reviews", value: "4", hint: "Reviews" },
      { label: "favourites", value: "3", hint: "Favourites" },
      { label: "wallet", value: "Tk 50", hint: "Wallet" },
    ],
    [],
  );

  if (isOnboardingMode) {
    return (
      <ProfileNameStepScreen
        role="customer"
          onNext={() => switchRootScreen("CustomerDashboard")}
      />
    );
  }

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ProfileOverviewCard
          avatarUri="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=240&q=60"
          name="Tarik H"
          onProfilePress={() => undefined}
          phoneLabel="+8800182036562"
          ratingLabel="4.7"
          stats={profileStats}
          verificationLabel="VERIFIED CUSTOMER"
        />

        <Card style={styles.settingsCard}>
          {settings.map((entry, index) => (
            <ProfileSettingRow
              iconName={entry.iconName}
              key={entry.key}
              onPress={entry.onPress}
              showDivider={index < settings.length - 1}
              subtitle={entry.subtitle}
              title={entry.title}
              tone={entry.tone}
            />
          ))}
        </Card>

        <Card style={styles.legalCard}>
          {legalSettings.map((entry, index) => (
            <Pressable key={entry.key} style={({ pressed }) => [styles.legalRow, pressed ? styles.pressed : null]}>
              <Text allowFontScaling={false} style={styles.legalText}>{entry.label}</Text>
              <Text allowFontScaling={false} style={styles.legalArrow}>›</Text>
              {index < legalSettings.length - 1 ? <View style={styles.legalDivider} /> : null}
            </Pressable>
          ))}
        </Card>

        <Pressable onPress={() => setShowLogoutSheet(true)} style={({ pressed }) => [styles.logoutCard, pressed ? styles.pressed : null]}>
          <View style={styles.logoutIconWrap}>
            <Feather color="#DC2626" name="log-out" size={11} />
          </View>
          <Text allowFontScaling={false} style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>

      <BottomNav activeKey="profile" containerStyle={styles.bottomNav} items={navItems} />

      <LogoutConfirmSheet
        accountLabel="Customer"
        onClose={() => setShowLogoutSheet(false)}
        onConfirm={() => {
          setShowLogoutSheet(false);
          switchRootScreen("Login");
        }}
        subtitle="You need sign in again to access orders and wallet."
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
