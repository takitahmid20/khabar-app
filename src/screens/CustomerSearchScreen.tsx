import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  CustomerSearchFilterPanel,
  CustomerSearchSortSheet,
  DashboardSearchBar,
  NearbyCookRow,
  SearchRecentRow,
  SearchSortPill,
  type CustomerSearchSortOption,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { BottomNav, IconButton, type BottomNavItem } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type RatingFilterOption = "Any" | "4+" | "4.5+" | "4.8+";

type SearchCook = {
  key: string;
  cookId: string;
  dishImageUri: string;
  avatarUri: string;
  cookName: string;
  areaLabel: string;
  ratingValue: number;
  reviewCount: string;
  etaLabel: string;
  etaMinutes: number;
  distanceLabel: string;
  distanceKm: number;
  cuisines: string[];
  priceLabel: string;
  priceFrom: number;
  recommendedRank: number;
};

const SORT_OPTIONS: CustomerSearchSortOption[] = [
  { key: "recommended", label: "Recommended" },
  { key: "rating", label: "Rating" },
  { key: "distance", label: "Distance" },
  { key: "deliveryTime", label: "Delivery time" },
  { key: "priceLowHigh", label: "Price: Low to High" },
];

const RATING_FILTER_OPTIONS: RatingFilterOption[] = ["Any", "4+", "4.5+", "4.8+"];

const CUISINE_FILTER_OPTIONS = [
  "Rice & Curry",
  "Biryani",
  "Fish Curry",
  "Halim",
  "Nihari",
  "Desserts",
  "Mughlai",
];

const RECENT_SEARCHES = ["Kacchi Biryani", "Rina Begum", "Halim near Dhanmondi"];

const SEARCH_COOKS: SearchCook[] = [
  {
    key: "search-rina",
    cookId: "rina",
    dishImageUri: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
    cookName: "Rina Begum",
    areaLabel: "Dhanmondi",
    ratingValue: 4.8,
    reviewCount: "234",
    etaLabel: "45-60 min",
    etaMinutes: 52,
    distanceLabel: "1.2 km",
    distanceKm: 1.2,
    cuisines: ["Rice & Curry", "Biryani"],
    priceLabel: "from Tk 80-200",
    priceFrom: 80,
    recommendedRank: 1,
  },
  {
    key: "search-farida",
    cookId: "farida",
    dishImageUri: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1542204625-de293a42d236?auto=format&fit=crop&w=200&q=60",
    cookName: "Farida Ahmed",
    areaLabel: "Gulshan",
    ratingValue: 4.9,
    reviewCount: "189",
    etaLabel: "50-70 min",
    etaMinutes: 60,
    distanceLabel: "2.4 km",
    distanceKm: 2.4,
    cuisines: ["Fish Curry", "Mughlai"],
    priceLabel: "from Tk 150-300",
    priceFrom: 150,
    recommendedRank: 2,
  },
  {
    key: "search-ayesha",
    cookId: "ayesha",
    dishImageUri: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200&q=60",
    cookName: "Ayesha Khan",
    areaLabel: "Mirpur",
    ratingValue: 4.7,
    reviewCount: "312",
    etaLabel: "40-55 min",
    etaMinutes: 48,
    distanceLabel: "3.1 km",
    distanceKm: 3.1,
    cuisines: ["Halim", "Nihari"],
    priceLabel: "from Tk 80-160",
    priceFrom: 80,
    recommendedRank: 3,
  },
  {
    key: "search-sumiya",
    cookId: "sumiya",
    dishImageUri: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=60",
    avatarUri: "https://images.unsplash.com/photo-1541778480-4282c7c2b70f?auto=format&fit=crop&w=200&q=60",
    cookName: "Sumiya Islam",
    areaLabel: "Banasree",
    ratingValue: 4.6,
    reviewCount: "164",
    etaLabel: "30-45 min",
    etaMinutes: 38,
    distanceLabel: "1.8 km",
    distanceKm: 1.8,
    cuisines: ["Desserts", "Rice & Curry"],
    priceLabel: "from Tk 60-120",
    priceFrom: 60,
    recommendedRank: 4,
  },
];

function getMinimumRating(option: RatingFilterOption): number {
  if (option === "4+") {
    return 4;
  }

  if (option === "4.5+") {
    return 4.5;
  }

  if (option === "4.8+") {
    return 4.8;
  }

  return 0;
}

export default function CustomerSearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedSortKey, setSelectedSortKey] = useState<CustomerSearchSortOption["key"]>("recommended");
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const [draftCuisines, setDraftCuisines] = useState<string[]>([]);
  const [draftRating, setDraftRating] = useState<RatingFilterOption>("Any");

  const [appliedCuisines, setAppliedCuisines] = useState<string[]>([]);
  const [appliedRating, setAppliedRating] = useState<RatingFilterOption>("Any");

  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.key === selectedSortKey)?.label ?? "Recommended";

  const hasAppliedFilters = appliedCuisines.length > 0 || appliedRating !== "Any";

  const visibleCooks = useMemo(() => {
    const minRating = getMinimumRating(appliedRating);

    let filtered = SEARCH_COOKS.filter((cook) => cook.ratingValue >= minRating);

    if (appliedCuisines.length > 0) {
      filtered = filtered.filter((cook) =>
        appliedCuisines.some((selectedCuisine) => cook.cuisines.includes(selectedCuisine))
      );
    }

    const sorted = [...filtered];

    switch (selectedSortKey) {
      case "rating":
        sorted.sort((a, b) => b.ratingValue - a.ratingValue);
        break;
      case "distance":
        sorted.sort((a, b) => a.distanceKm - b.distanceKm);
        break;
      case "deliveryTime":
        sorted.sort((a, b) => a.etaMinutes - b.etaMinutes);
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      default:
        sorted.sort((a, b) => a.recommendedRank - b.recommendedRank);
        break;
    }

    return sorted;
  }, [appliedCuisines, appliedRating, selectedSortKey]);

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

  const handleToggleCuisine = (selectedCuisine: string) => {
    setDraftCuisines((previous) =>
      previous.includes(selectedCuisine)
        ? previous.filter((item) => item !== selectedCuisine)
        : [...previous, selectedCuisine]
    );
  };

  const handleFilterButtonPress = () => {
    setShowFilterPanel((previous) => {
      const next = !previous;

      if (next) {
        setDraftCuisines(appliedCuisines);
        setDraftRating(appliedRating);
      }

      return next;
    });
  };

  const handleApplyFilters = () => {
    setAppliedCuisines(draftCuisines);
    setAppliedRating(draftRating);
    setShowFilterPanel(false);
  };

  const handleClearDraftFilters = () => {
    setDraftCuisines([]);
    setDraftRating("Any");
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchRow}>
          <DashboardSearchBar
            containerStyle={styles.searchBar}
            placeholder="Search cooks, dishes, cuisines..."
          />

          <IconButton
            containerStyle={[
              styles.filterButton,
              showFilterPanel || hasAppliedFilters ? styles.filterButtonActive : null,
            ]}
            iconColor={showFilterPanel || hasAppliedFilters ? COLORS.white : "#6B7280"}
            iconName="sliders"
            iconSize={18}
            onPress={handleFilterButtonPress}
          />
        </View>

        <SearchSortPill label={activeSortLabel} onPress={() => setShowSortSheet(true)} />

        {showFilterPanel ? (
          <CustomerSearchFilterPanel
            cuisineOptions={CUISINE_FILTER_OPTIONS}
            onApply={handleApplyFilters}
            onClear={handleClearDraftFilters}
            onCuisineToggle={handleToggleCuisine}
            onRatingSelect={(option) => setDraftRating(option as RatingFilterOption)}
            ratingOptions={RATING_FILTER_OPTIONS}
            selectedCuisines={draftCuisines}
            selectedRating={draftRating}
          />
        ) : null}

        <View style={styles.sectionWrap}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.recentListWrap}>
            {RECENT_SEARCHES.map((item, index) => (
              <SearchRecentRow
                key={item}
                label={item}
                showBorder={index < RECENT_SEARCHES.length - 1}
              />
            ))}
          </View>
        </View>

        <View style={styles.sectionWrap}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>All Cooks</Text>
          <View style={styles.cooksListWrap}>
            {visibleCooks.length > 0 ? (
              visibleCooks.map((cook) => (
                <NearbyCookRow
                  areaLabel={cook.areaLabel}
                  avatarUri={cook.avatarUri}
                  cookName={cook.cookName}
                  cuisines={cook.cuisines}
                  dishImageUri={cook.dishImageUri}
                  distanceLabel={cook.distanceLabel}
                  etaLabel={cook.etaLabel}
                  key={cook.key}
                  onPress={() => navigation.navigate("CustomerCookDetails", { cookId: cook.cookId })}
                  priceLabel={cook.priceLabel}
                  rating={cook.ratingValue.toFixed(1)}
                  reviewCount={cook.reviewCount}
                />
              ))
            ) : (
              <View style={styles.emptyStateCard}>
                <Text allowFontScaling={false} style={styles.emptyStateTitle}>No cooks found</Text>
                <Text allowFontScaling={false} style={styles.emptyStateSubtitle}>
                  Adjust filter or try another sort option.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <BottomNav activeKey="explore" containerStyle={styles.bottomNav} items={navItems} />

      <CustomerSearchSortSheet
        onClose={() => setShowSortSheet(false)}
        onSelect={(sortKey) => {
          setSelectedSortKey(sortKey);
          setShowSortSheet(false);
        }}
        options={SORT_OPTIONS}
        selectedKey={selectedSortKey}
        visible={showSortSheet}
      />
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
  searchRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  searchBar: {
    flex: 1,
  },
  filterButton: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    height: 42,
    width: 42,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primarySoft,
  },
  sectionWrap: {
    gap: 8,
  },
  sectionTitle: {
    color: "#374151",
    fontSize: 20 / 1.6,
    fontWeight: "800",
    lineHeight: 18,
  },
  recentListWrap: {
    gap: 1,
  },
  cooksListWrap: {
    gap: 8,
  },
  emptyStateCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 14,
    borderWidth: 1,
    gap: 4,
    minHeight: 110,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  emptyStateSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "center",
  },
  bottomNav: {
    marginTop: "auto",
  },
});
