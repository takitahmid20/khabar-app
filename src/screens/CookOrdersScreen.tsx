import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  CookBottomMenu,
  type CookBottomMenuTabKey,
  CookOrderCard,
  CookOrderEmptyState,
  CookOrderStatusTabs,
  type CookOrderTabKey,
  CookRejectReasonSheet,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type CookOrderWorkflowState = "new" | "preparing" | "outForDelivery" | "delivered" | "rejected";

const REJECTION_REASONS = [
  "Sold out",
  "Capacity reached",
  "Ingredient unavailable",
  "Kitchen issue",
  "Other",
];

export default function CookOrdersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<CookOrderTabKey>("new");
  const [workflowState, setWorkflowState] = useState<CookOrderWorkflowState>("new");
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [showRejectReasonSheet, setShowRejectReasonSheet] = useState(false);

  const tabCounts = useMemo(
    () => ({
      new: workflowState === "new" ? 1 : 0,
      preparing: workflowState === "preparing" ? 1 : 0,
      outForDelivery: workflowState === "outForDelivery" ? 1 : 0,
      delivered: workflowState === "delivered" ? 1 : 0,
    }),
    [workflowState],
  );

  const handleBottomTabPress = (tabKey: CookBottomMenuTabKey) => {
    if (tabKey === "dashboard") {
      navigation.navigate("Home");
      return;
    }

    if (tabKey === "orders") {
      return;
    }

    if (tabKey === "profile") {
      navigation.navigate("CookName");
    }
  };

  const handleStartPreparing = () => {
    setWorkflowState("preparing");
    setActiveTab("preparing");
  };

  const handleMarkOutForDelivery = () => {
    setWorkflowState("outForDelivery");
    setActiveTab("outForDelivery");
  };

  const handleMarkDelivered = () => {
    setWorkflowState("delivered");
    setActiveTab("delivered");
  };

  const handleRejectWithReason = (reason: string) => {
    setRejectionReason(reason);
    setShowRejectReasonSheet(false);
    setWorkflowState("rejected");
    setActiveTab("new");
  };

  const renderCurrentTabContent = () => {
    if (activeTab === "new") {
      if (workflowState === "new") {
        return (
          <CookOrderCard
            code="co-002"
            customerName="Nusrat Jahan"
            items={[{ name: "1 x Chicken Curry Set", amountLabel: "Tk 120" }]}
            locationLabel="Flat 38, Lalmatia"
            note="Less spicy please"
            onPrimaryActionPress={handleStartPreparing}
            onSecondaryActionPress={() => setShowRejectReasonSheet(true)}
            paymentLine="12:00 PM - Nagad"
            primaryActionLabel="Start Preparing"
            secondaryActionLabel="Reject"
            tone="new"
            totalLabel="Tk 120"
          />
        );
      }

      return (
        <CookOrderEmptyState
          message={
            rejectionReason
              ? `Last rejection reason: ${rejectionReason}. New orders will appear here.`
              : "New orders will appear here when customers place them."
          }
        />
      );
    }

    if (activeTab === "preparing") {
      if (workflowState === "preparing") {
        return (
          <CookOrderCard
            code="co-001"
            customerName="Tariq Hasan"
            items={[
              { name: "2 x Kacchi Biryani", amountLabel: "Tk 360" },
              { name: "2 x Extra Raita", amountLabel: "Tk 40" },
            ]}
            locationLabel="House 12, Road 4, Dhanmondi"
            onPrimaryActionPress={handleMarkOutForDelivery}
            paymentLine="12:30 PM - bKash"
            primaryActionLabel="Mark Out for Delivery"
            tone="preparing"
            totalLabel="Tk 400"
          />
        );
      }

      return <CookOrderEmptyState title="No preparing orders" />;
    }

    if (activeTab === "outForDelivery") {
      if (workflowState === "outForDelivery") {
        return (
          <CookOrderCard
            code="co-003"
            customerName="Arif Billah"
            items={[{ name: "2 x Dal Bhat Set", amountLabel: "Tk 180" }]}
            locationLabel="New Market area"
            onPrimaryActionPress={handleMarkDelivered}
            paymentLine="11:45 AM - bKash"
            primaryActionLabel="Mark Delivered"
            tone="outForDelivery"
            totalLabel="Tk 180"
          />
        );
      }

      return <CookOrderEmptyState title="No orders out for delivery" />;
    }

    if (workflowState === "delivered") {
      return (
        <CookOrderCard
          code="co-004"
          customerName="Mariam Begum"
          items={[{ name: "1 x Beef Bhuna Rice", amountLabel: "Tk 160" }]}
          locationLabel="Hazaribagh"
          paymentLine="11:00 AM - Card"
          tone="delivered"
          totalLabel="Tk 160"
        />
      );
    }

    return <CookOrderEmptyState title="No delivered orders" />;
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text allowFontScaling={false} style={styles.titleText}>Orders</Text>

        <CookOrderStatusTabs activeKey={activeTab} counts={tabCounts} onTabPress={setActiveTab} />

        {renderCurrentTabContent()}
      </ScrollView>

      <CookBottomMenu activeKey="orders" containerStyle={styles.bottomNav} onTabPress={handleBottomTabPress} />

      <CookRejectReasonSheet
        onClose={() => setShowRejectReasonSheet(false)}
        onSelectReason={handleRejectWithReason}
        reasons={REJECTION_REASONS}
        visible={showRejectReasonSheet}
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
    flexGrow: 1,
    gap: 10,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  titleText: {
    color: "#111827",
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 32,
  },
  bottomNav: {
    marginTop: "auto",
  },
});