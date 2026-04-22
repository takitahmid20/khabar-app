import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../components/layout";
import { Button, DetailSheetModal, RadioOptionCard } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type DetailsTab = "menu" | "reviews" | "about";

type BadgeTone = "green" | "orange" | "purple";

type CookBadge = {
  key: string;
  label: string;
  iconName: React.ComponentProps<typeof Feather>["name"];
  tone: BadgeTone;
};

type MealSlot = "breakfast" | "lunch" | "dinner";

type MenuDish = {
  key: string;
  name: string;
  mealSlot: MealSlot;
  description: string;
  priceLabel: string;
  imageUri: string;
  showPopular?: boolean;
  addOnsLabel?: string;
};

type MenuDaySection = {
  dayLabel: string;
  items: MenuDish[];
};

type PlanType = "today" | "monthly";

type PendingCheckoutItem = {
  key: string;
  dayLabel: string;
  mealSlot: MealSlot;
  dish: MenuDish;
  quantity: number;
  planType: PlanType;
  monthMultiplier: number;
};

type CookReview = {
  key: string;
  reviewerName: string;
  avatarUri: string;
  stars: number;
  daysAgoLabel: string;
  message: string;
};

type CookDetails = {
  key: string;
  name: string;
  ratingLabel: string;
  reviewCountLabel: string;
  areaLabel: string;
  distanceLabel: string;
  coverImageUri: string;
  avatarUri: string;
  slotProgress: number;
  slotsLeftLabel: string;
  badges: CookBadge[];
  menuByDay: MenuDaySection[];
  ratingDistribution: number[];
  reviews: CookReview[];
  kitchenStory: string;
  aboutRows: { label: string; value: string }[];
};

const COOK_DETAILS_MAP: Record<string, CookDetails> = {
  rina: {
    key: "rina",
    name: "Rina Begum",
    ratingLabel: "4.8",
    reviewCountLabel: "234",
    areaLabel: "Dhanmondi",
    distanceLabel: "1.2 km",
    coverImageUri: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=60",
    avatarUri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=60",
    slotProgress: 0.72,
    slotsLeftLabel: "7 left",
    badges: [
      { key: "identity", label: "Identity Verified", iconName: "check-circle", tone: "green" },
      { key: "hygiene", label: "Hygiene Checked", iconName: "hexagon", tone: "orange" },
      { key: "cutoff", label: "Cutoff 10:00 AM", iconName: "clock", tone: "purple" },
    ],
    menuByDay: [
      {
        dayLabel: "Monday",
        items: [
          {
            key: "kacchi-biryani",
            name: "Kacchi Biryani",
            mealSlot: "lunch",
            showPopular: true,
            description: "Slow-cooked mutton biryani with saffron and fried onions. Comes with raita.",
            addOnsLabel: "+ Add-ons available",
            priceLabel: "Tk 180",
            imageUri: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=500&q=60",
          },
          {
            key: "chicken-curry-rice",
            name: "Chicken Curry Rice",
            mealSlot: "dinner",
            showPopular: true,
            description: "Boneless chicken curry with steamed rice, dal and seasonal vegetable.",
            priceLabel: "Tk 120",
            imageUri: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
      {
        dayLabel: "Tuesday",
        items: [
          {
            key: "beef-khichuri",
            name: "Beef Khichuri",
            mealSlot: "lunch",
            description: "Moong dal khichuri topped with spicy beef bhuna and salad.",
            priceLabel: "Tk 160",
            imageUri: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    ],
    ratingDistribution: [92, 66, 18, 8, 4],
    reviews: [
      {
        key: "review-tariq",
        reviewerName: "Tariq Hasan",
        avatarUri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=60",
        stars: 5,
        daysAgoLabel: "2 days ago",
        message: "Rina apa's biryani is absolutely incredible. Better than any restaurant. Mutton was fall-off-the-bone tender.",
      },
      {
        key: "review-nusrat",
        reviewerName: "Nusrat Jahan",
        avatarUri: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=180&q=60",
        stars: 5,
        daysAgoLabel: "5 days ago",
        message: "Ordering from Rina for 3 months now. Consistent quality and always on time. Dal bhat feels homemade.",
      },
    ],
    kitchenStory: "Cooking authentic Bengali home meals for 12 years. My kitchen is my heart. Everything made fresh, with love, like ammu used to make.",
    aboutRows: [
      { label: "Location", value: "Dhanmondi" },
      { label: "Delivery time", value: "45-60 min" },
      { label: "Minimum order", value: "Tk 120" },
      { label: "Order cutoff", value: "10:00 AM" },
      { label: "Price range", value: "Tk 80-200" },
    ],
  },
  farida: {
    key: "farida",
    name: "Farida Ahmed",
    ratingLabel: "4.9",
    reviewCountLabel: "189",
    areaLabel: "Gulshan",
    distanceLabel: "2.4 km",
    coverImageUri: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=60",
    avatarUri: "https://images.unsplash.com/photo-1542204625-de293a42d236?auto=format&fit=crop&w=300&q=60",
    slotProgress: 0.66,
    slotsLeftLabel: "5 left",
    badges: [
      { key: "identity", label: "Identity Verified", iconName: "check-circle", tone: "green" },
      { key: "hygiene", label: "Hygiene Checked", iconName: "hexagon", tone: "orange" },
      { key: "cutoff", label: "Cutoff 11:00 AM", iconName: "clock", tone: "purple" },
    ],
    menuByDay: [
      {
        dayLabel: "Monday",
        items: [
          {
            key: "hilsa-curry",
            name: "Hilsa Curry",
            mealSlot: "lunch",
            description: "Mustard hilsa served with rice and mashed eggplant.",
            priceLabel: "Tk 220",
            imageUri: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    ],
    ratingDistribution: [110, 52, 14, 5, 2],
    reviews: [],
    kitchenStory: "Focused on rich fish curries and Mughlai-inspired lunch boxes with home-style consistency.",
    aboutRows: [
      { label: "Location", value: "Gulshan" },
      { label: "Delivery time", value: "50-70 min" },
      { label: "Minimum order", value: "Tk 150" },
      { label: "Order cutoff", value: "11:00 AM" },
      { label: "Price range", value: "Tk 150-300" },
    ],
  },
  ayesha: {
    key: "ayesha",
    name: "Ayesha Khan",
    ratingLabel: "4.7",
    reviewCountLabel: "312",
    areaLabel: "Mirpur",
    distanceLabel: "3.1 km",
    coverImageUri: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=60",
    avatarUri: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=300&q=60",
    slotProgress: 0.58,
    slotsLeftLabel: "4 left",
    badges: [
      { key: "identity", label: "Identity Verified", iconName: "check-circle", tone: "green" },
      { key: "hygiene", label: "Hygiene Checked", iconName: "hexagon", tone: "orange" },
      { key: "cutoff", label: "Cutoff 9:30 AM", iconName: "clock", tone: "purple" },
    ],
    menuByDay: [
      {
        dayLabel: "Monday",
        items: [
          {
            key: "halim-special",
            name: "Halim Special",
            mealSlot: "dinner",
            description: "Slow-stirred beef halim served with lemon, fried onion and naan.",
            priceLabel: "Tk 140",
            imageUri: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    ],
    ratingDistribution: [120, 88, 44, 18, 7],
    reviews: [],
    kitchenStory: "Home-cooked halim and nihari focused kitchen. Rich flavor, less oil, everyday comfort meals.",
    aboutRows: [
      { label: "Location", value: "Mirpur" },
      { label: "Delivery time", value: "40-55 min" },
      { label: "Minimum order", value: "Tk 80" },
      { label: "Order cutoff", value: "9:30 AM" },
      { label: "Price range", value: "Tk 80-160" },
    ],
  },
  sumiya: {
    key: "sumiya",
    name: "Sumiya Islam",
    ratingLabel: "4.6",
    reviewCountLabel: "164",
    areaLabel: "Banasree",
    distanceLabel: "1.8 km",
    coverImageUri: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=60",
    avatarUri: "https://images.unsplash.com/photo-1541778480-4282c7c2b70f?auto=format&fit=crop&w=300&q=60",
    slotProgress: 0.5,
    slotsLeftLabel: "3 left",
    badges: [
      { key: "identity", label: "Identity Verified", iconName: "check-circle", tone: "green" },
      { key: "hygiene", label: "Hygiene Checked", iconName: "hexagon", tone: "orange" },
      { key: "cutoff", label: "Cutoff 11:30 AM", iconName: "clock", tone: "purple" },
    ],
    menuByDay: [
      {
        dayLabel: "Monday",
        items: [
          {
            key: "mishti-doi-box",
            name: "Mishti Doi Box",
            mealSlot: "breakfast",
            description: "Fresh mishti doi and mini desserts box, ideal for family lunch ending.",
            priceLabel: "Tk 90",
            imageUri: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    ],
    ratingDistribution: [72, 52, 23, 10, 7],
    reviews: [],
    kitchenStory: "Dessert-first home kitchen. Light meals plus Bengali sweets prepared each morning in small batches.",
    aboutRows: [
      { label: "Location", value: "Banasree" },
      { label: "Delivery time", value: "30-45 min" },
      { label: "Minimum order", value: "Tk 60" },
      { label: "Order cutoff", value: "11:30 AM" },
      { label: "Price range", value: "Tk 60-120" },
    ],
  },
};

const TAB_ITEMS: Array<{ key: DetailsTab; label: string }> = [
  { key: "menu", label: "Menu" },
  { key: "reviews", label: "Reviews(3)" },
  { key: "about", label: "About" },
];

const MEAL_SLOT_OPTIONS: Array<{ key: MealSlot; label: string }> = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

const RATING_SCALE = [5, 4, 3, 2, 1] as const;

type ToneColors = {
  backgroundColor: string;
  textColor: string;
};

function getBadgeToneColors(tone: BadgeTone): ToneColors {
  if (tone === "green") {
    return { backgroundColor: "#E8F5EC", textColor: "#2D6A4F" };
  }

  if (tone === "orange") {
    return { backgroundColor: "#FDF0DD", textColor: "#C97908" };
  }

  return { backgroundColor: "#EEE9FF", textColor: "#6D4AFF" };
}

function parsePriceLabel(priceLabel: string): number {
  const numeric = priceLabel.replace(/[^0-9]/g, "");

  if (!numeric) {
    return 0;
  }

  return Number(numeric);
}

function buildPendingItemKey(dayLabel: string, dish: MenuDish, planType: PlanType): string {
  return [dayLabel, dish.key, dish.mealSlot, planType].join("::");
}

export default function CustomerCookDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CustomerCookDetails">>();

  const [activeTab, setActiveTab] = useState<DetailsTab>("menu");
  const [pendingCheckoutItems, setPendingCheckoutItems] = useState<PendingCheckoutItem[]>([]);
  const [planPickerContext, setPlanPickerContext] = useState<{ dayLabel: string; dish: MenuDish } | null>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType>("today");

  const cook = useMemo(() => {
    const cookId = route.params?.cookId;

    if (cookId && COOK_DETAILS_MAP[cookId]) {
      return COOK_DETAILS_MAP[cookId];
    }

    return COOK_DETAILS_MAP.rina;
  }, [route.params?.cookId]);

  const defaultDaySlotMap = useMemo(() => {
    return cook.menuByDay.reduce<Record<string, MealSlot>>((accumulator, daySection) => {
      const hasBreakfast = daySection.items.some((item) => item.mealSlot === "breakfast");
      const hasLunch = daySection.items.some((item) => item.mealSlot === "lunch");

      accumulator[daySection.dayLabel] = hasLunch ? "lunch" : hasBreakfast ? "breakfast" : "dinner";
      return accumulator;
    }, {});
  }, [cook]);

  const [selectedMealSlotByDay, setSelectedMealSlotByDay] = useState<Record<string, MealSlot>>(defaultDaySlotMap);

  useEffect(() => {
    setSelectedMealSlotByDay(defaultDaySlotMap);
  }, [defaultDaySlotMap]);

  const pendingCheckoutTotal = useMemo(() => {
    return pendingCheckoutItems.reduce((sum, item) => {
      const unitPrice = parsePriceLabel(item.dish.priceLabel);
      return sum + unitPrice * item.quantity * item.monthMultiplier;
    }, 0);
  }, [pendingCheckoutItems]);

  const openPlanPicker = (dayLabel: string, dish: MenuDish) => {
    setSelectedPlanType("today");
    setPlanPickerContext({ dayLabel, dish });
  };

  const closePlanPicker = () => {
    setPlanPickerContext(null);
  };

  const addPendingCheckoutItem = () => {
    if (!planPickerContext) {
      return;
    }

    const monthMultiplier = selectedPlanType === "monthly" ? 4 : 1;
    const itemKey = buildPendingItemKey(planPickerContext.dayLabel, planPickerContext.dish, selectedPlanType);

    setPendingCheckoutItems((previous) => {
      const existingItem = previous.find((item) => item.key === itemKey);

      if (!existingItem) {
        return [
          ...previous,
          {
            key: itemKey,
            dayLabel: planPickerContext.dayLabel,
            mealSlot: planPickerContext.dish.mealSlot,
            dish: planPickerContext.dish,
            quantity: 1,
            planType: selectedPlanType,
            monthMultiplier,
          },
        ];
      }

      return previous.map((item) => {
        if (item.key !== itemKey) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
    });

    closePlanPicker();
  };

  const proceedToCheckout = () => {
    if (pendingCheckoutItems.length === 0) {
      return;
    }

    navigation.navigate("CustomerCheckout", {
      cookId: cook.key,
      cookName: cook.name,
      items: pendingCheckoutItems.map((item) => ({
        dayLabel: item.dayLabel,
        dishKey: item.dish.key,
        dishName: item.dish.name,
        mealSlot: item.mealSlot,
        imageUri: item.dish.imageUri,
        unitPrice: parsePriceLabel(item.dish.priceLabel),
        quantity: item.quantity,
        monthMultiplier: item.monthMultiplier,
        planType: item.planType,
      })),
    });
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: cook.coverImageUri }} style={styles.coverImage} />
          <View style={styles.heroDimmer} />

          <View style={styles.heroActionsRow}>
            <RoundIconButton iconName="arrow-left" onPress={() => navigation.goBack()} />
            <View style={styles.heroRightActions}>
              <RoundIconButton iconName="share-2" />
              <RoundIconButton iconName="heart" />
            </View>
          </View>

          <View style={styles.heroIdentityWrap}>
            <Image source={{ uri: cook.avatarUri }} style={styles.heroAvatar} />

            <View style={styles.heroTextWrap}>
              <View style={styles.nameRow}>
                <Text allowFontScaling={false} style={styles.heroName}>{cook.name}</Text>
                <View style={styles.verifiedDot}>
                  <Feather color={COLORS.white} name="check" size={10} />
                </View>
              </View>

              <View style={styles.metaRow}>
                <MaterialIcons color="#FBBF24" name="star" size={13} />
                <Text allowFontScaling={false} style={styles.heroMetaText}>{`${cook.ratingLabel} (${cook.reviewCountLabel})`}</Text>
                <Text allowFontScaling={false} style={styles.heroMetaDivider}>•</Text>
                <Text allowFontScaling={false} style={styles.heroMetaText}>{cook.areaLabel}</Text>
                <Text allowFontScaling={false} style={styles.heroMetaDivider}>•</Text>
                <Text allowFontScaling={false} style={styles.heroMetaText}>{cook.distanceLabel}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.contentWrap, pendingCheckoutItems.length > 0 ? styles.contentWrapWithCta : null]}>
          <Button
            containerStyle={styles.monthlyButton}
            fullWidth
            onPress={() =>
              navigation.navigate("CustomerMonthlyPlan", {
                cookId: cook.key,
                cookName: cook.name,
                menuByDay: cook.menuByDay,
              })
            }
            rightIconName="calendar"
            title="Monthly"
          />

          <View style={styles.badgesRow}>
            {cook.badges.map((badge) => {
              const toneColors = getBadgeToneColors(badge.tone);

              return (
                <View
                  key={badge.key}
                  style={[styles.badgeChip, { backgroundColor: toneColors.backgroundColor }]}
                >
                  <Feather color={toneColors.textColor} name={badge.iconName} size={11} />
                  <Text allowFontScaling={false} style={[styles.badgeText, { color: toneColors.textColor }]}>
                    {badge.label}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.slotsWrap}>
            <View style={styles.slotsHeaderRow}>
              <Text allowFontScaling={false} style={styles.slotsLabel}>Today's slots</Text>
              <Text allowFontScaling={false} style={styles.slotsLeftLabel}>{cook.slotsLeftLabel}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.max(0, Math.min(1, cook.slotProgress)) * 100}%` }]} />
            </View>
          </View>

          <View style={styles.tabsRow}>
            {TAB_ITEMS.map((tab) => {
              const isActive = tab.key === activeTab;

              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={({ pressed }) => [styles.tabButton, pressed ? styles.pressed : null]}
                >
                  <Text allowFontScaling={false} style={[styles.tabLabel, isActive ? styles.tabLabelActive : null]}>
                    {tab.label}
                  </Text>
                  <View style={[styles.tabIndicator, isActive ? styles.tabIndicatorActive : null]} />
                </Pressable>
              );
            })}
          </View>

          {activeTab === "menu" ? (
            <View style={styles.contentSectionWrap}>
              {cook.menuByDay.map((daySection) => {
                const selectedSlot = selectedMealSlotByDay[daySection.dayLabel] ?? "lunch";
                const visibleItems = daySection.items.filter((item) => item.mealSlot === selectedSlot);

                return (
                  <View key={daySection.dayLabel} style={styles.daySectionWrap}>
                    <Text allowFontScaling={false} style={styles.dayLabel}>{daySection.dayLabel}</Text>

                    <View style={styles.mealSlotRow}>
                      {MEAL_SLOT_OPTIONS.map((slotOption) => {
                        const isActive = selectedSlot === slotOption.key;

                        return (
                          <Pressable
                            key={`${daySection.dayLabel}-${slotOption.key}`}
                            onPress={() => {
                              setSelectedMealSlotByDay((previous) => ({
                                ...previous,
                                [daySection.dayLabel]: slotOption.key,
                              }));
                            }}
                            style={({ pressed }) => [
                              styles.mealSlotChip,
                              isActive ? styles.mealSlotChipActive : styles.mealSlotChipInactive,
                              pressed ? styles.pressed : null,
                            ]}
                          >
                            <Text
                              allowFontScaling={false}
                              style={[
                                styles.mealSlotChipLabel,
                                isActive ? styles.mealSlotChipLabelActive : styles.mealSlotChipLabelInactive,
                              ]}
                            >
                              {slotOption.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>

                    <View style={styles.menuCardsWrap}>
                      {visibleItems.length > 0 ? (
                        visibleItems.map((dish) => (
                          <View key={dish.key} style={styles.menuCard}>
                            <View style={styles.menuCardMainRow}>
                              <View style={styles.menuCardTextWrap}>
                                <View style={styles.menuTitleRow}>
                                  <Text allowFontScaling={false} style={styles.menuTitle}>{dish.name}</Text>
                                  {dish.showPopular ? (
                                    <View style={styles.popularChip}>
                                      <Text allowFontScaling={false} style={styles.popularText}>POPULAR</Text>
                                    </View>
                                  ) : null}
                                </View>

                                <Text allowFontScaling={false} style={styles.menuDescription}>{dish.description}</Text>

                                {dish.addOnsLabel ? (
                                  <Text allowFontScaling={false} style={styles.addOnsLabel}>{dish.addOnsLabel}</Text>
                                ) : null}
                              </View>

                              <Image source={{ uri: dish.imageUri }} style={styles.menuDishImage} />
                            </View>

                            <View style={styles.menuBottomRow}>
                              <Text allowFontScaling={false} style={styles.priceLabel}>{dish.priceLabel}</Text>

                              <Pressable
                                onPress={() => openPlanPicker(daySection.dayLabel, dish)}
                                style={({ pressed }) => [styles.addButton, pressed ? styles.pressed : null]}
                              >
                                <Text allowFontScaling={false} style={styles.addButtonText}>+ Add</Text>
                              </Pressable>
                            </View>
                          </View>
                        ))
                      ) : (
                        <View style={styles.emptyMealSlotCard}>
                          <Text allowFontScaling={false} style={styles.emptyMealSlotTitle}>{`No ${selectedSlot} menu yet`}</Text>
                          <Text allowFontScaling={false} style={styles.emptyMealSlotSubtitle}>Switch tab or check other day menu.</Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          ) : null}

          {activeTab === "reviews" ? (
            <View style={styles.contentSectionWrap}>
              <View style={styles.reviewsSummaryCard}>
                <View style={styles.summaryLeftWrap}>
                  <Text allowFontScaling={false} style={styles.summaryRating}>{cook.ratingLabel}</Text>
                  <View style={styles.summaryStarsRow}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <MaterialIcons color="#FBBF24" key={`summary-star-${index}`} name="star" size={13} />
                    ))}
                  </View>
                  <Text allowFontScaling={false} style={styles.summaryReviewCount}>{`${cook.reviewCountLabel} reviews`}</Text>
                </View>

                <View style={styles.summaryBarsWrap}>
                  {RATING_SCALE.map((ratingValue, index) => {
                    const distributionValue = cook.ratingDistribution[index] ?? 0;
                    const maxDistribution = Math.max(...cook.ratingDistribution, 1);
                    const fillRatio = distributionValue / maxDistribution;

                    return (
                      <View key={`bar-${ratingValue}`} style={styles.summaryBarRow}>
                        <Text allowFontScaling={false} style={styles.summaryBarLabel}>{ratingValue}</Text>
                        <View style={styles.summaryBarTrack}>
                          <View style={[styles.summaryBarFill, { width: `${fillRatio * 100}%` }]} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.reviewCardsWrap}>
                {cook.reviews.map((review) => (
                  <View key={review.key} style={styles.reviewCard}>
                    <View style={styles.reviewHeaderRow}>
                      <Image source={{ uri: review.avatarUri }} style={styles.reviewAvatar} />

                      <View style={styles.reviewHeaderTextWrap}>
                        <View style={styles.reviewNameRow}>
                          <Text allowFontScaling={false} style={styles.reviewName}>{review.reviewerName}</Text>
                          <View style={styles.reviewVerifiedChip}>
                            <Text allowFontScaling={false} style={styles.reviewVerifiedText}>VERIFIED</Text>
                          </View>
                        </View>

                        <View style={styles.reviewMetaRow}>
                          <View style={styles.reviewStarsRow}>
                            {Array.from({ length: review.stars }).map((_, index) => (
                              <MaterialIcons color="#FBBF24" key={`${review.key}-star-${index}`} name="star" size={12} />
                            ))}
                          </View>
                          <Text allowFontScaling={false} style={styles.reviewDaysAgo}>{review.daysAgoLabel}</Text>
                        </View>
                      </View>
                    </View>

                    <Text allowFontScaling={false} style={styles.reviewMessage}>{review.message}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {activeTab === "about" ? (
            <View style={styles.contentSectionWrap}>
              <View style={styles.aboutCard}>
                <Text allowFontScaling={false} style={styles.aboutTitle}>Kitchen Story</Text>
                <Text allowFontScaling={false} style={styles.aboutStory}>{cook.kitchenStory}</Text>

                <View style={styles.aboutRowsWrap}>
                  {cook.aboutRows.map((row, index) => (
                    <View key={row.label} style={[styles.aboutRow, index < cook.aboutRows.length - 1 ? styles.aboutRowBorder : null]}>
                      <Text allowFontScaling={false} style={styles.aboutRowLabel}>{row.label}</Text>
                      <Text allowFontScaling={false} style={styles.aboutRowValue}>{row.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <DetailSheetModal
        onClose={closePlanPicker}
        subtitle={planPickerContext ? `${planPickerContext.dish.name} - ${planPickerContext.dayLabel}` : undefined}
        title="Choose plan"
        visible={Boolean(planPickerContext)}
      >
        <View style={styles.planOptionWrap}>
          <RadioOptionCard
            containerStyle={styles.planOptionCard}
            label="Only for today"
            onPress={() => setSelectedPlanType("today")}
            selected={selectedPlanType === "today"}
          />
          <RadioOptionCard
            containerStyle={styles.planOptionCard}
            label="Monthly"
            onPress={() => setSelectedPlanType("monthly")}
            selected={selectedPlanType === "monthly"}
          />
        </View>

        <Button
          containerStyle={styles.planConfirmButton}
          fullWidth
          onPress={addPendingCheckoutItem}
          title="Add to cart"
        />
      </DetailSheetModal>

      {pendingCheckoutItems.length > 0 ? (
        <View style={styles.floatingCtaWrap}>
          <View style={styles.floatingCtaCard}>
            <View style={styles.floatingCtaTextWrap}>
              <Text allowFontScaling={false} style={styles.floatingCtaTitle}>{`${pendingCheckoutItems.length} item${pendingCheckoutItems.length > 1 ? "s" : ""} selected`}</Text>
              <Text allowFontScaling={false} style={styles.floatingCtaAmount}>{`Tk ${pendingCheckoutTotal}`}</Text>
            </View>

            <Button
              containerStyle={styles.proceedButton}
              onPress={proceedToCheckout}
              title="Proceed to cart"
            />
          </View>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

type RoundIconButtonProps = {
  iconName: React.ComponentProps<typeof Feather>["name"];
  onPress?: () => void;
};

function RoundIconButton({ iconName, onPress }: RoundIconButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.roundIconButton, pressed ? styles.pressed : null]}>
      <Feather color={COLORS.white} name={iconName} size={17} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#EEF0F2",
    padding: 0,
  },
  heroWrap: {
    height: 224,
    position: "relative",
  },
  coverImage: {
    height: "100%",
    width: "100%",
  },
  heroDimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17, 24, 39, 0.33)",
  },
  heroActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: SPACING.lg,
    position: "absolute",
    right: SPACING.lg,
    top: SPACING.lg,
  },
  heroRightActions: {
    flexDirection: "row",
    gap: 10,
  },
  roundIconButton: {
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.34)",
    borderColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 999,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  heroIdentityWrap: {
    alignItems: "flex-end",
    flexDirection: "row",
    left: SPACING.lg,
    position: "absolute",
    right: SPACING.lg,
    bottom: 14,
  },
  heroAvatar: {
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    borderWidth: 1.2,
    height: 54,
    width: 54,
  },
  heroTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  heroName: {
    color: COLORS.white,
    fontSize: 33 / 1.65,
    fontWeight: "800",
    lineHeight: 22,
  },
  verifiedDot: {
    alignItems: "center",
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    height: 16,
    justifyContent: "center",
    width: 16,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 3,
  },
  heroMetaText: {
    color: "#E5E7EB",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  heroMetaDivider: {
    color: "#9CA3AF",
    fontSize: 11,
    lineHeight: 14,
  },
  contentWrap: {
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: -12,
    minHeight: 600,
    paddingHorizontal: SPACING.lg,
    paddingTop: 12,
    paddingBottom: 18,
  },
  contentWrapWithCta: {
    paddingBottom: 108,
  },
  monthlyButton: {
    borderRadius: 12,
    marginBottom: 2,
    minHeight: 48,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badgeChip: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 5,
    minHeight: 30,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 15,
  },
  slotsWrap: {
    marginTop: 10,
  },
  slotsHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slotsLabel: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 16,
  },
  slotsLeftLabel: {
    color: "#3F6D58",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  progressTrack: {
    backgroundColor: "#D1D5DB",
    borderRadius: 999,
    height: 5,
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    height: "100%",
  },
  tabsRow: {
    backgroundColor: "#EFF1F3",
    borderColor: "#E5E7EB",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 12,
    overflow: "hidden",
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    gap: 7,
    paddingTop: 11,
  },
  tabLabel: {
    color: "#9CA3AF",
    fontSize: 23 / 1.75,
    fontWeight: "700",
    lineHeight: 16,
  },
  tabLabelActive: {
    color: COLORS.primarySoft,
  },
  tabIndicator: {
    backgroundColor: "transparent",
    borderRadius: 999,
    height: 2.6,
    width: 52,
  },
  tabIndicatorActive: {
    backgroundColor: COLORS.primarySoft,
  },
  contentSectionWrap: {
    marginTop: 12,
  },
  daySectionWrap: {
    gap: 8,
    marginBottom: 14,
  },
  dayLabel: {
    color: "#374151",
    fontSize: 22 / 1.6,
    fontWeight: "700",
    lineHeight: 18,
  },
  mealSlotRow: {
    flexDirection: "row",
    gap: 8,
  },
  mealSlotChip: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 32,
    minWidth: 88,
    paddingHorizontal: 12,
  },
  mealSlotChipActive: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primarySoft,
  },
  mealSlotChipInactive: {
    backgroundColor: "#EFF1F3",
    borderColor: "#E5E7EB",
  },
  mealSlotChipLabel: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  mealSlotChipLabelActive: {
    color: COLORS.white,
  },
  mealSlotChipLabelInactive: {
    color: "#6B7280",
  },
  menuCardsWrap: {
    gap: 10,
  },
  emptyMealSlotCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    gap: 3,
    minHeight: 88,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  emptyMealSlotTitle: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  emptyMealSlotSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    textAlign: "center",
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    padding: 12,
    gap: 8,
  },
  menuCardMainRow: {
    flexDirection: "row",
    gap: 10,
  },
  menuCardTextWrap: {
    flex: 1,
    gap: 5,
  },
  menuTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  menuTitle: {
    color: "#1F2937",
    fontSize: 22 / 1.6,
    fontWeight: "800",
    lineHeight: 18,
  },
  popularChip: {
    backgroundColor: "#FDE9C8",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  popularText: {
    color: "#BD7B11",
    fontSize: 9,
    fontWeight: "800",
    lineHeight: 11,
  },
  menuDescription: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
  addOnsLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  menuDishImage: {
    borderRadius: 12,
    height: 70,
    width: 70,
  },
  menuBottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabel: {
    color: "#1F2937",
    fontSize: 30 / 1.6,
    fontWeight: "800",
    lineHeight: 20,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    minWidth: 62,
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 15 / 1.2,
    fontWeight: "700",
    lineHeight: 16,
  },
  planOptionWrap: {
    gap: 10,
  },
  planOptionCard: {
    borderRadius: 14,
    minHeight: 62,
    paddingHorizontal: 14,
  },
  planConfirmButton: {
    borderRadius: 12,
    marginTop: 12,
    minHeight: 46,
  },
  floatingCtaWrap: {
    bottom: SPACING.md,
    left: SPACING.lg,
    position: "absolute",
    right: SPACING.lg,
  },
  floatingCtaCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  floatingCtaTextWrap: {
    flex: 1,
    gap: 1,
  },
  floatingCtaTitle: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  floatingCtaAmount: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },
  proceedButton: {
    borderRadius: 10,
    minHeight: 40,
    paddingHorizontal: 16,
  },
  reviewsSummaryCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 16,
    padding: 12,
  },
  summaryLeftWrap: {
    width: 90,
  },
  summaryRating: {
    color: "#111827",
    fontSize: 56 / 1.6,
    fontWeight: "800",
    lineHeight: 34,
  },
  summaryStarsRow: {
    flexDirection: "row",
    gap: 1,
    marginTop: 2,
  },
  summaryReviewCount: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    marginTop: 3,
  },
  summaryBarsWrap: {
    flex: 1,
    gap: 6,
    justifyContent: "center",
  },
  summaryBarRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  summaryBarLabel: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
    width: 8,
  },
  summaryBarTrack: {
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    flex: 1,
    height: 5,
    overflow: "hidden",
  },
  summaryBarFill: {
    backgroundColor: "#FBBF24",
    height: "100%",
  },
  reviewCardsWrap: {
    gap: 10,
    marginTop: 10,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  reviewHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  reviewAvatar: {
    borderRadius: 999,
    height: 34,
    width: 34,
  },
  reviewHeaderTextWrap: {
    flex: 1,
    marginLeft: 9,
    gap: 3,
  },
  reviewNameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  reviewName: {
    color: "#1F2937",
    fontSize: 20 / 1.6,
    fontWeight: "700",
    lineHeight: 17,
  },
  reviewVerifiedChip: {
    backgroundColor: "#E8F5EC",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  reviewVerifiedText: {
    color: COLORS.primarySoft,
    fontSize: 9,
    fontWeight: "800",
    lineHeight: 11,
  },
  reviewMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  reviewStarsRow: {
    flexDirection: "row",
    gap: 1,
  },
  reviewDaysAgo: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 14,
  },
  reviewMessage: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  aboutCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    padding: 14,
  },
  aboutTitle: {
    color: "#1F2937",
    fontSize: 22 / 1.6,
    fontWeight: "800",
    lineHeight: 18,
  },
  aboutStory: {
    color: "#4B5563",
    fontSize: 16 / 1.25,
    fontWeight: "500",
    lineHeight: 23,
    marginTop: 9,
  },
  aboutRowsWrap: {
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    marginTop: 14,
  },
  aboutRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 42,
  },
  aboutRowBorder: {
    borderBottomColor: "#EEF0F2",
    borderBottomWidth: 1,
  },
  aboutRowLabel: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  aboutRowValue: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 19,
  },
  pressed: {
    opacity: 0.85,
  },
});
