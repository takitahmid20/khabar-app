import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  CategoryPill,
  DashboardHeader,
  DashboardSearchBar,
  NearbyCookRow,
  PromoBannerCard,
  QuickFilterPill,
  SectionHeaderRow,
  TrendingCookCard,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { BottomNav, type BottomNavItem } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type QuickFilter = {
  key: string;
  label: string;
  iconName: React.ComponentProps<typeof Feather>["name"];
};

type TrendingCook = {
  key: string;
  cookId: string;
  cookName: string;
  areaLabel: string;
  ratingLabel: string;
  foodImageUri: string;
};

type NearbyCook = {
  key: string;
  cookId: string;
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
};

const CATEGORY_OPTIONS = ["All", "Rice Dishes", "Biryani", "Fish Curry", "Desserts"] as const;

const QUICK_FILTERS: QuickFilter[] = [
  {
    key: "verified",
    label: "Verified Cooks",
    iconName: "shield",
  },
  {
    key: "fast",
    label: "Fast Delivery",
    iconName: "zap",
  },
  {
    key: "home",
    label: "Home Kitchen",
    iconName: "home",
  },
];

const TRENDING_COOKS: TrendingCook[] = [
  {
    key: "rina",
    cookId: "rina",
    cookName: "Rina Begum",
    areaLabel: "Dhanmondi · 1.2 km",
    ratingLabel: "4.8",
    foodImageUri: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=60",
  },
  {
    key: "farida",
    cookId: "farida",
    cookName: "Farida Ahmed",
    areaLabel: "Gulshan · 2.4 km",
    ratingLabel: "4.9",
    foodImageUri: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=700&q=60",
  },
];

const NEARBY_COOKS: NearbyCook[] = [
  {
    key: "nearby-rina",
    cookId: "rina",
    dishImageUri: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
    cookName: "Rina Begum",
    areaLabel: "Dhanmondi",
    rating: "4.8",
    reviewCount: "234",
    etaLabel: "45-60 min",
    distanceLabel: "1.2 km",
    cuisines: ["Rice & Curry", "Biryani"],
    priceLabel: "from Tk 80-200",
  },
  {
    key: "nearby-farida",
    cookId: "farida",
    dishImageUri: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1542204625-de293a42d236?auto=format&fit=crop&w=200&q=60",
    cookName: "Farida Ahmed",
    areaLabel: "Gulshan",
    rating: "4.9",
    reviewCount: "189",
    etaLabel: "50-70 min",
    distanceLabel: "2.4 km",
    cuisines: ["Hilsa Fish", "Mughlai"],
    priceLabel: "from Tk 150-300",
  },
  {
    key: "nearby-ayesha",
    cookId: "ayesha",
    dishImageUri: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200&q=60",
    cookName: "Ayesha Khan",
    areaLabel: "Mirpur",
    rating: "4.7",
    reviewCount: "310",
    etaLabel: "40-55 min",
    distanceLabel: "3.1 km",
    cuisines: ["Halim", "Nihari"],
    priceLabel: "from Tk 80-160",
  },
  {
    key: "nearby-sumiya",
    cookId: "sumiya",
    dishImageUri: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1541778480-4282c7c2b70f?auto=format&fit=crop&w=200&q=60",
    cookName: "Sumiaya Islam",
    areaLabel: "Banasree",
    rating: "4.6",
    reviewCount: "156",
    etaLabel: "30-45 min",
    distanceLabel: "1.8 km",
    cuisines: ["Desserts", "Mishti Doi"],
    priceLabel: "from Tk 60-120",
  },
];

export default function CustomerDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>("All");

  const navItems: BottomNavItem[] = [
    {
      key: "home",
      label: "Home",
      iconName: "home",
      onPress: () => navigation.navigate("CustomerDashboard"),
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
      onPress: () => navigation.navigate("CustomerProfile", { mode: "profile" }),
    },
  ];

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader
          greeting="Good afternoon, Tarik"
          hasNotification
          location="Dhanmondi, Dhaka"
        />

        <DashboardSearchBar
          onPress={() => navigation.navigate("CustomerSearch")}
          placeholder="Search cooks, dishes, cuisines..."
        />

        <ScrollView
          contentContainerStyle={styles.categoriesRow}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORY_OPTIONS.map((category) => (
            <CategoryPill
              key={category}
              active={activeCategory === category}
              label={category}
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>

        <PromoBannerCard
          actionLabel="Claim offer"
          subtitle="Use code KHABAR20 at checkout"
          title="20% off your first order"
        />

        <ScrollView
          contentContainerStyle={styles.quickFiltersRow}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {QUICK_FILTERS.map((item) => (
            <QuickFilterPill
              key={item.key}
              iconName={item.iconName}
              label={item.label}
            />
          ))}
        </ScrollView>

        <SectionHeaderRow actionLabel="See all" title="Trending Cooks" />

        <ScrollView
          contentContainerStyle={styles.trendingRow}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {TRENDING_COOKS.map((cook) => (
            <TrendingCookCard
              key={cook.key}
              areaLabel={cook.areaLabel}
              cookName={cook.cookName}
              foodImageUri={cook.foodImageUri}
              onPress={() => navigation.navigate("CustomerCookDetails", { cookId: cook.cookId })}
              ratingLabel={cook.ratingLabel}
            />
          ))}
        </ScrollView>

        <SectionHeaderRow
          rightContent={
            <View style={styles.distanceBadge}>
              <Feather color={COLORS.primarySoft} name="map-pin" size={11} />
              <Text allowFontScaling={false} style={styles.distanceBadgeText}>Within 5 km</Text>
            </View>
          }
          title="Nearby Cooks"
        />

        <View style={styles.nearbyList}>
          {NEARBY_COOKS.map((cook) => (
            <NearbyCookRow
              key={cook.key}
              areaLabel={cook.areaLabel}
              avatarUri={cook.avatarUri}
              cookName={cook.cookName}
              cuisines={cook.cuisines}
              dishImageUri={cook.dishImageUri}
              distanceLabel={cook.distanceLabel}
              etaLabel={cook.etaLabel}
              onPress={() => navigation.navigate("CustomerCookDetails", { cookId: cook.cookId })}
              priceLabel={cook.priceLabel}
              rating={cook.rating}
              reviewCount={cook.reviewCount}
            />
          ))}
        </View>
      </ScrollView>

      <BottomNav activeKey="home" containerStyle={styles.bottomNav} items={navItems} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.background,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: SPACING.md,
  },
  scrollContent: {
    gap: SPACING.sm,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  categoriesRow: {
    gap: 8,
    paddingVertical: 6,
  },
  quickFiltersRow: {
    gap: 8,
    paddingVertical: 4,
  },
  trendingRow: {
    gap: 10,
    paddingBottom: 2,
  },
  distanceBadge: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  distanceBadgeText: {
    color: COLORS.primarySoft,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  nearbyList: {
    gap: 8,
  },
  bottomNav: {
    marginTop: "auto",
  },
});