import { StackActions, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  CategoryPill,
  DashboardSummaryHeader,
  DashboardBottomMenu,
  type DashboardBottomMenuTabKey,
  OrderEmptyState,
  type MealSlot,
  SectionHeaderRow,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { Button, Card } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type ContributionType = "Subscription" | "One-off" | "Override" | "Cancellation";

type ProductionStatus = "pending" | "preparing" | "packed" | "outForDelivery" | "delivered";

type DemandContribution = {
  id: string;
  customerName: string;
  companyName: string;
  deliveryAddress: string;
  phoneNumber?: string;
  quantity: number;
  type: ContributionType;
  isDelivered: boolean;
};

type DemandItem = {
  id: string;
  dishName: string;
  mealSlot: MealSlot;
  cutoffLabel: string;
  baseline: number;
  oneOff: number;
  overrides: number;
  cancellations: number;
  capacity: number;
  isLocked: boolean;
  productionStatus: ProductionStatus;
  contributions: DemandContribution[];
};

const INITIAL_DEMAND_ITEMS: DemandItem[] = [
  {
    id: "dish-chicken-curry",
    dishName: "Rice + Chicken Curry",
    mealSlot: "Lunch",
    cutoffLabel: "Cutoff 10:00 AM",
    baseline: 5,
    oneOff: 2,
    overrides: 1,
    cancellations: 0,
    capacity: 8,
    isLocked: false,
    productionStatus: "pending",
    contributions: [
      {
        id: "chicken-1",
        customerName: "Ayesha Rahman",
        companyName: "ByteBridge Ltd",
        deliveryAddress: "House 12, Road 4, Dhanmondi, Dhaka",
        phoneNumber: "01711000111",
        quantity: 3,
        type: "Subscription",
        isDelivered: false,
      },
      {
        id: "chicken-2",
        customerName: "Farhan Kabir",
        companyName: "UrbanGrid Studio",
        deliveryAddress: "Flat B2, 22 Elephant Road, Dhaka",
        quantity: 2,
        type: "One-off",
        isDelivered: false,
      },
      {
        id: "chicken-3",
        customerName: "Nusrat Jahan",
        companyName: "AsterOps Solutions",
        deliveryAddress: "Building 8, Bashundhara R/A, Block C, Dhaka",
        phoneNumber: "01822000333",
        quantity: 1,
        type: "Override",
        isDelivered: false,
      },
      {
        id: "chicken-4",
        customerName: "Sabbir Ahmed",
        companyName: "Greenline Merchants",
        deliveryAddress: "Shop 16, New Market Annex, Dhaka",
        quantity: 2,
        type: "Subscription",
        isDelivered: false,
      },
    ],
  },
  {
    id: "dish-fish-curry",
    dishName: "Rice + Fish Curry",
    mealSlot: "Lunch",
    cutoffLabel: "Cutoff 10:00 AM",
    baseline: 2,
    oneOff: 1,
    overrides: 0,
    cancellations: 0,
    capacity: 7,
    isLocked: false,
    productionStatus: "pending",
    contributions: [
      {
        id: "fish-1",
        customerName: "Tanvir Hasan",
        companyName: "LoopCart Distribution",
        deliveryAddress: "Suite 503, Lift 2, Motijheel C/A, Dhaka",
        phoneNumber: "01933000444",
        quantity: 2,
        type: "Override",
        isDelivered: false,
      },
      {
        id: "fish-2",
        customerName: "Mahi Karim",
        companyName: "NorthLane Retail",
        deliveryAddress: "Road 11, Sector 4, Uttara, Dhaka",
        quantity: 1,
        type: "One-off",
        isDelivered: false,
      },
    ],
  },
  {
    id: "dish-beef-khichuri",
    dishName: "Beef Khichuri",
    mealSlot: "Dinner",
    cutoffLabel: "Cutoff 4:00 PM",
    baseline: 3,
    oneOff: 0,
    overrides: 1,
    cancellations: 1,
    capacity: 5,
    isLocked: false,
    productionStatus: "pending",
    contributions: [
      {
        id: "beef-1",
        customerName: "Rifat Hossain",
        companyName: "Bengal Systems",
        deliveryAddress: "2nd Floor, House 91, Mirpur DOHS, Dhaka",
        phoneNumber: "01644000555",
        quantity: 2,
        type: "Subscription",
        isDelivered: false,
      },
      {
        id: "beef-2",
        customerName: "Tania Akter",
        companyName: "HarborTech BD",
        deliveryAddress: "Lane 3, Kalabagan, Dhaka",
        quantity: 1,
        type: "Subscription",
        isDelivered: false,
      },
      {
        id: "beef-3",
        customerName: "Shihab Uddin",
        companyName: "DeltaCore Logistics",
        deliveryAddress: "Warehouse 5, Tejgaon Industrial Area, Dhaka",
        phoneNumber: "01555000666",
        quantity: 1,
        type: "Override",
        isDelivered: false,
      },
      {
        id: "beef-4",
        customerName: "Sadia Islam",
        companyName: "BlueLeaf Ventures",
        deliveryAddress: "Block D, Road 8, Banasree, Dhaka",
        quantity: 1,
        type: "Cancellation",
        isDelivered: false,
      },
    ],
  },
];

const PRODUCTION_STATUS_LABELS: Record<ProductionStatus, string> = {
  pending: "Pending",
  preparing: "Preparing",
  packed: "Packed",
  outForDelivery: "Out for Delivery",
  delivered: "Delivered",
};

const WEEKDAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CookOrdersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mealFilter, setMealFilter] = useState<"All" | MealSlot>("All");
  const [demandItems, setDemandItems] = useState<DemandItem[]>(INITIAL_DEMAND_ITEMS);
  const [selectedDemandItemId, setSelectedDemandItemId] = useState<string | null>(null);
  const [showCustomerListScreen, setShowCustomerListScreen] = useState(false);

  const switchRootScreen = (screenName: keyof RootStackParamList) => {
    navigation.dispatch(StackActions.replace(screenName));
  };

  const filteredDemandItems = useMemo(
    () =>
      mealFilter === "All"
        ? demandItems
        : demandItems.filter((item) => item.mealSlot === mealFilter),
    [demandItems, mealFilter],
  );

  const selectedDemandItem = useMemo(
    () => demandItems.find((item) => item.id === selectedDemandItemId) ?? null,
    [demandItems, selectedDemandItemId],
  );

  const cookingDayLabel = useMemo(() => {
    const now = new Date();
    return `${WEEKDAY_LABELS[now.getDay()]}, ${now.getDate()} ${MONTH_LABELS[now.getMonth()]}`;
  }, []);

  const totals = useMemo(() => {
    const baseline = filteredDemandItems.reduce((sum, item) => sum + item.baseline, 0);
    const oneOff = filteredDemandItems.reduce((sum, item) => sum + item.oneOff, 0);
    const overrides = filteredDemandItems.reduce((sum, item) => sum + item.overrides, 0);
    const cancellations = filteredDemandItems.reduce((sum, item) => sum + item.cancellations, 0);
    const netChange = overrides - cancellations;
    const totalPortions = baseline + oneOff + overrides - cancellations;

    const capacityRiskCount = filteredDemandItems.filter(
      (item) => item.baseline + item.oneOff + item.overrides - item.cancellations > item.capacity,
    ).length;

    return {
      baseline,
      oneOff,
      netChange,
      totalMeals: totalPortions,
      capacityRiskCount,
    };
  }, [filteredDemandItems]);

  const handleBottomTabPress = (tabKey: DashboardBottomMenuTabKey) => {
    if (tabKey === "dashboard") {
      switchRootScreen("Home");
      return;
    }

    if (tabKey === "orders") {
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

  const getItemTotal = (item: DemandItem) => item.baseline + item.oneOff + item.overrides - item.cancellations;

  const isContributionDeliverable = (entry: DemandContribution) => entry.type !== "Cancellation";

  const getDeliveryStats = (item: DemandItem) => {
    const deliverableEntries = item.contributions.filter(isContributionDeliverable);
    const deliveredCount = deliverableEntries.filter((entry) => entry.isDelivered).length;
    const totalCount = deliverableEntries.length;

    return {
      deliveredCount,
      totalCount,
      allDelivered: totalCount === 0 || deliveredCount === totalCount,
    };
  };

  const getNextStatus = (status: ProductionStatus): ProductionStatus | null => {
    if (status === "pending") {
      return "preparing";
    }

    if (status === "preparing") {
      return "packed";
    }

    if (status === "packed") {
      return "outForDelivery";
    }

    if (status === "outForDelivery") {
      return "delivered";
    }

    return null;
  };

  const getNextActionLabel = (nextStatus: ProductionStatus | null) => {
    if (nextStatus === "preparing") {
      return "Next: Preparing";
    }

    if (nextStatus === "packed") {
      return "Next: Packed";
    }

    if (nextStatus === "outForDelivery") {
      return "Next: Out for Delivery";
    }

    return "Open Customer List";
  };

  const advanceProductionStatus = (itemId: string) => {
    setDemandItems((previous) =>
      previous.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        if (!item.isLocked) {
          return item;
        }

        const nextStatus = getNextStatus(item.productionStatus);

        if (!nextStatus) {
          return item;
        }

        return {
          ...item,
          productionStatus: nextStatus,
        };
      }),
    );
  };

  const lockProductionForItem = (itemId: string) => {
    setDemandItems((previous) =>
      previous.map((item) => (item.id === itemId ? { ...item, isLocked: true } : item)),
    );
  };

  const openCustomerBreakdown = (itemId: string) => {
    setSelectedDemandItemId(itemId);
    setShowCustomerListScreen(true);
  };

  const markContributionDelivered = (itemId: string, contributionId: string) => {
    setDemandItems((previous) =>
      previous.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const nextContributions = item.contributions.map((entry) => {
          if (entry.id !== contributionId || !isContributionDeliverable(entry)) {
            return entry;
          }

          return {
            ...entry,
            isDelivered: true,
          };
        });

        const nextItem = {
          ...item,
          contributions: nextContributions,
        };

        return item.productionStatus === "outForDelivery" && getDeliveryStats(nextItem).allDelivered
          ? { ...nextItem, productionStatus: "delivered" }
          : nextItem;
      }),
    );
  };

  const getContributionTone = (type: ContributionType) => {
    if (type === "Subscription") {
      return "normal";
    }

    if (type === "One-off") {
      return "positive";
    }

    if (type === "Override") {
      return "positive";
    }

    return "normal";
  };

  const getContributionLabel = (entry: DemandContribution) => {
    const sign = entry.type === "Cancellation" ? "-" : "+";
    return `${entry.type} ${sign}${entry.quantity}`;
  };

  const callCustomer = async (phoneNumber?: string) => {
    if (!phoneNumber) {
      return;
    }

    const telUri = `tel:${phoneNumber}`;
    const canCall = await Linking.canOpenURL(telUri);

    if (canCall) {
      await Linking.openURL(telUri);
    }
  };

  const selectedDeliveryStats = selectedDemandItem ? getDeliveryStats(selectedDemandItem) : null;

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DashboardSummaryHeader
          greeting="Demand Board"
          hasNotification={totals.capacityRiskCount > 0}
          subtitle="Menu-first production planning for today"
        />

        <Card style={styles.dayInfoCard}>
          <Text allowFontScaling={false} style={styles.dayInfoTitle}>Cooking Day</Text>
          <Text allowFontScaling={false} style={styles.dayInfoValue}>{cookingDayLabel}</Text>
          <Text allowFontScaling={false} style={styles.dayInfoHint}>
            All meal totals below are for this day.
          </Text>
        </Card>

        <SectionHeaderRow title="Meal Filter" titleStyle={styles.sectionTitleText} />
        <View style={styles.mealFilterRow}>
          <CategoryPill
            active={mealFilter === "All"}
            containerStyle={styles.filterPill}
            label="All"
            labelStyle={styles.filterPillLabel}
            onPress={() => setMealFilter("All")}
          />
          <CategoryPill
            active={mealFilter === "Breakfast"}
            containerStyle={styles.filterPill}
            label="Breakfast"
            labelStyle={styles.filterPillLabel}
            onPress={() => setMealFilter("Breakfast")}
          />
          <CategoryPill
            active={mealFilter === "Lunch"}
            containerStyle={styles.filterPill}
            label="Lunch"
            labelStyle={styles.filterPillLabel}
            onPress={() => setMealFilter("Lunch")}
          />
          <CategoryPill
            active={mealFilter === "Dinner"}
            containerStyle={styles.filterPill}
            label="Dinner"
            labelStyle={styles.filterPillLabel}
            onPress={() => setMealFilter("Dinner")}
          />
        </View>

        <SectionHeaderRow title="Live Demand Board" titleStyle={styles.sectionTitleText} />

        {filteredDemandItems.length === 0 ? (
          <OrderEmptyState
            message="No demand items in this meal slot. Create menu items and publish to start receiving demand."
            title="No demand items"
          />
        ) : (
          <View style={styles.demandBoardList}>
            {filteredDemandItems.map((item) => {
              const total = getItemTotal(item);
              const isSelected = selectedDemandItem?.id === item.id;
              const nextStatus = getNextStatus(item.productionStatus);
              const deliveryStats = getDeliveryStats(item);

              return (
                <Pressable
                  key={item.id}
                  onPress={() => openCustomerBreakdown(item.id)}
                  style={({ pressed }) => [
                    styles.demandCardPressable,
                    isSelected ? styles.demandCardPressableActive : null,
                    pressed ? styles.demandCardPressed : null,
                  ]}
                >
                  <Card style={styles.demandCard}>
                    <View style={styles.demandHeaderRow}>
                      <View style={styles.demandTitleWrap}>
                        <Text allowFontScaling={false} style={styles.demandTitleText}>{item.dishName}</Text>
                        <Text allowFontScaling={false} style={styles.demandSubtitleText}>{`${item.mealSlot} - ${item.cutoffLabel}`}</Text>
                      </View>

                      <Text allowFontScaling={false} style={styles.demandTotalText}>{`${total} meals`}</Text>
                    </View>

                    <View style={styles.metricsRow}>
                      <MetricCell label="Baseline" value={item.baseline} />
                      <MetricCell label="One-off" value={item.oneOff} />
                      <MetricCell label="Net" value={item.overrides - item.cancellations} signed />
                      <MetricCell label="Capacity" value={`${item.capacity}`} />
                    </View>

                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.capacityText,
                        total > item.capacity ? styles.capacityRiskText : styles.capacitySafeText,
                      ]}
                    >
                      {total > item.capacity
                        ? `Capacity exceeded by ${total - item.capacity}`
                        : `Capacity left ${item.capacity - total}`}
                    </Text>

                    <View style={styles.productionRow}>
                      <Text allowFontScaling={false} style={styles.productionStatusText}>
                        {item.productionStatus === "outForDelivery"
                          ? `Production: ${PRODUCTION_STATUS_LABELS[item.productionStatus]} (${deliveryStats.deliveredCount}/${deliveryStats.totalCount})`
                          : `Production: ${PRODUCTION_STATUS_LABELS[item.productionStatus]}`}
                      </Text>

                      {!item.isLocked ? (
                        <Button
                          containerStyle={styles.statusAdvanceButton}
                          onPress={() => lockProductionForItem(item.id)}
                          textStyle={styles.statusAdvanceButtonText}
                          title="Lock Plan"
                        />
                      ) : nextStatus && nextStatus !== "delivered" ? (
                        <Button
                          containerStyle={styles.statusAdvanceButton}
                          onPress={() => advanceProductionStatus(item.id)}
                          textStyle={styles.statusAdvanceButtonText}
                          title={getNextActionLabel(nextStatus)}
                        />
                      ) : nextStatus === "delivered" ? (
                        <Button
                          containerStyle={styles.statusAdvanceButton}
                          onPress={() => openCustomerBreakdown(item.id)}
                          textStyle={styles.statusAdvanceButtonText}
                          title={getNextActionLabel(nextStatus)}
                        />
                      ) : (
                        <Text allowFontScaling={false} style={styles.lockedDoneText}>Completed</Text>
                      )}
                    </View>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>

      <DashboardBottomMenu activeKey="orders" containerStyle={styles.bottomNav} onTabPress={handleBottomTabPress} />

      <Modal
        animationType="slide"
        onRequestClose={() => setShowCustomerListScreen(false)}
        presentationStyle="fullScreen"
        visible={showCustomerListScreen && Boolean(selectedDemandItem)}
      >
        <View style={styles.fullScreenContainer}>
          <View style={styles.fullScreenHeader}>
            <Pressable
              onPress={() => setShowCustomerListScreen(false)}
              style={({ pressed }) => [styles.fullScreenBackButton, pressed ? styles.demandCardPressed : null]}
            >
              <Text allowFontScaling={false} style={styles.fullScreenBackText}>Back</Text>
            </Pressable>

            <Text allowFontScaling={false} style={styles.fullScreenTitle}>Customer Delivery List</Text>
          </View>

          {selectedDemandItem ? (
            <ScrollView contentContainerStyle={styles.fullScreenContent} showsVerticalScrollIndicator={false}>
              <Card style={styles.fullScreenDishCard}>
                <Text allowFontScaling={false} style={styles.fullScreenDishName}>{selectedDemandItem.dishName}</Text>
                <Text allowFontScaling={false} style={styles.fullScreenDishMeta}>
                  {`${selectedDemandItem.mealSlot} - ${selectedDemandItem.cutoffLabel}`}
                </Text>
                <Text allowFontScaling={false} style={styles.fullScreenDishMeta}>
                  {`Status: ${PRODUCTION_STATUS_LABELS[selectedDemandItem.productionStatus]}`}
                </Text>
                {selectedDemandItem.productionStatus === "outForDelivery" && selectedDeliveryStats ? (
                  <Text allowFontScaling={false} style={styles.fullScreenDeliveryProgress}>
                    {`Delivered ${selectedDeliveryStats.deliveredCount}/${selectedDeliveryStats.totalCount}`}
                  </Text>
                ) : null}
              </Card>

              <View style={styles.breakdownList}>
                {selectedDemandItem.productionStatus === "outForDelivery" ? (
                  <Text allowFontScaling={false} style={styles.breakdownHintText}>
                    Tap Delivered beside each customer to complete this dish.
                  </Text>
                ) : null}

                {selectedDemandItem.contributions.map((entry) => (
                  <Card key={entry.id} style={styles.customerCard}>
                    <View style={styles.customerHeaderRow}>
                      <View style={styles.customerIdentityWrap}>
                        <Text allowFontScaling={false} style={styles.breakdownCustomerText}>{entry.customerName}</Text>
                        <Text allowFontScaling={false} style={styles.customerCompanyText}>{entry.companyName}</Text>
                      </View>

                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.breakdownQuantityText,
                          entry.type === "Cancellation" ? styles.breakdownQuantityNegative : null,
                        ]}
                      >
                        {entry.type === "Cancellation" ? `-${entry.quantity}` : `+${entry.quantity}`}
                      </Text>
                    </View>

                    <View style={styles.customerAddressRow}>
                      <Feather color="#6B7280" name="map-pin" size={14} />
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.breakdownTypeText,
                          getContributionTone(entry.type) === "positive" ? styles.breakdownTypePositive : null,
                        ]}
                      >
                        {entry.deliveryAddress}
                      </Text>
                    </View>

                    <View style={styles.customerOptionsRow}>
                      <Text allowFontScaling={false} style={styles.customerOptionTag}>{getContributionLabel(entry)}</Text>

                      <View style={styles.breakdownRightWrap}>
                        {entry.phoneNumber ? (
                          <Pressable
                            onPress={() => {
                              void callCustomer(entry.phoneNumber);
                            }}
                            style={({ pressed }) => [
                              styles.callIconButton,
                              pressed ? styles.demandCardPressed : null,
                            ]}
                          >
                            <Feather color={COLORS.primarySoft} name="phone-call" size={14} />
                          </Pressable>
                        ) : null}

                        {isContributionDeliverable(entry) && entry.isDelivered ? (
                          <Text allowFontScaling={false} style={styles.breakdownDeliveredText}>Delivered</Text>
                        ) : selectedDemandItem.productionStatus === "outForDelivery" && isContributionDeliverable(entry) ? (
                          <Button
                            containerStyle={styles.breakdownDeliverButton}
                            onPress={() => markContributionDelivered(selectedDemandItem.id, entry.id)}
                            textStyle={styles.breakdownDeliverButtonText}
                            title="Delivered"
                          />
                        ) : (
                          <Text allowFontScaling={false} style={styles.customerPendingText}>
                            {entry.type === "Cancellation" ? "Cancelled" : "Pending"}
                          </Text>
                        )}
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            </ScrollView>
          ) : null}
        </View>
      </Modal>
    </ScreenContainer>
  );
}

type MetricCellProps = {
  label: string;
  value: number | string;
  signed?: boolean;
};

function MetricCell({ label, value, signed }: MetricCellProps) {
  const valueText = typeof value === "number" && signed ? `${value >= 0 ? "+" : ""}${value}` : String(value);

  return (
    <View style={styles.metricCell}>
      <Text allowFontScaling={false} style={styles.metricLabel}>{label}</Text>
      <Text allowFontScaling={false} style={styles.metricValue}>{valueText}</Text>
    </View>
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
  dayInfoCard: {
    gap: 5,
  },
  dayInfoTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 23,
  },
  dayInfoValue: {
    color: COLORS.primarySoft,
    fontSize: 21,
    fontWeight: "800",
    lineHeight: 28,
  },
  dayInfoHint: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
  },
  sectionTitleText: {
    fontSize: 20,
    lineHeight: 27,
  },
  mealFilterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterPill: {
    minHeight: 42,
    paddingHorizontal: 18,
  },
  filterPillLabel: {
    fontSize: 15,
    lineHeight: 20,
  },
  demandBoardList: {
    gap: 12,
  },
  demandCardPressable: {
    borderRadius: 16,
  },
  demandCardPressableActive: {
    borderColor: COLORS.primarySoft,
    borderWidth: 1,
  },
  demandCardPressed: {
    opacity: 0.9,
  },
  demandCard: {
    gap: 10,
  },
  demandHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  demandTitleWrap: {
    flex: 1,
    marginRight: 10,
  },
  demandTitleText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  demandSubtitleText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 1,
  },
  demandTotalText: {
    color: COLORS.primarySoft,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 8,
  },
  metricCell: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  metricLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  metricValue: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
    marginTop: 1,
  },
  capacityText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
  },
  capacitySafeText: {
    color: COLORS.primarySoft,
  },
  capacityRiskText: {
    color: "#B91C1C",
  },
  productionRow: {
    gap: 8,
  },
  productionStatusText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
  },
  statusAdvanceButton: {
    alignSelf: "flex-start",
    borderRadius: 10,
    minHeight: 38,
    maxWidth: "100%",
    paddingHorizontal: 14,
    paddingVertical: 0,
  },
  statusAdvanceButtonText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  lockedDoneText: {
    color: COLORS.primarySoft,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
  },
  breakdownList: {
    gap: 7,
  },
  breakdownHintText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 4,
  },
  customerCard: {
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  customerHeaderRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customerIdentityWrap: {
    flex: 1,
    marginRight: 10,
  },
  breakdownCustomerText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 21,
  },
  customerCompanyText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 1,
  },
  customerAddressRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 6,
  },
  breakdownTypeText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    flex: 1,
  },
  breakdownTypePositive: {
    color: COLORS.primarySoft,
  },
  customerOptionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customerOptionTag: {
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    color: "#3730A3",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  breakdownRightWrap: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 5,
    minWidth: 140,
  },
  breakdownQuantityText: {
    color: COLORS.primarySoft,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  breakdownQuantityNegative: {
    color: "#B91C1C",
  },
  callIconButton: {
    alignItems: "center",
    backgroundColor: "#E8F5EC",
    borderRadius: 8,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  breakdownDeliverButton: {
    borderRadius: 8,
    minHeight: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  breakdownDeliverButtonText: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  breakdownDeliveredText: {
    color: COLORS.primarySoft,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  customerPendingText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  fullScreenContainer: {
    backgroundColor: "#F3F4F6",
    flex: 1,
    paddingTop: SPACING.md,
  },
  fullScreenHeader: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    paddingBottom: 8,
  },
  fullScreenBackButton: {
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  fullScreenBackText: {
    color: COLORS.primarySoft,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  fullScreenTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  fullScreenContent: {
    gap: 12,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  fullScreenDishCard: {
    gap: 3,
  },
  fullScreenDishName: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  fullScreenDishMeta: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  fullScreenDeliveryProgress: {
    color: COLORS.primarySoft,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 2,
  },
  bottomNav: {
    marginTop: "auto",
  },
});