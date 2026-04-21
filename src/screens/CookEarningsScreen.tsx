import { StackActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  DashboardBottomMenu,
  type DashboardBottomMenuTabKey,
  EarningsBalanceCard,
  EarningsFeeNoteCard,
  EarningsStatSummaryCard,
  EarningsTrendCard,
  EarningsWithdrawSheet,
  type WithdrawPresetValue,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type TrendRange = "week" | "month";

const AVAILABLE_BALANCE = 12450;
const WITHDRAW_PRESETS: WithdrawPresetValue[] = [1000, 2000, 5000, "ALL"];

export default function CookEarningsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [trendRange, setTrendRange] = useState<TrendRange>("week");
  const [showWithdrawSheet, setShowWithdrawSheet] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("1000");
  const [processingWithdraw, setProcessingWithdraw] = useState(false);

  const switchRootScreen = (screenName: keyof RootStackParamList) => {
    navigation.dispatch(StackActions.replace(screenName));
  };

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
      return;
    }

    if (tabKey === "profile") {
      switchRootScreen("CookProfile");
    }
  };

  const weekValues = useMemo(() => [1200, 1800, 1500, 2100, 1900, 2400, 1600], []);
  const monthValues = useMemo(() => [7200, 8600, 8100, 9200, 9800, 11000, 10450], []);

  const submitDisabled = withdrawAmount.trim().length === 0 || Number.isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0;

  const handleWithdrawSubmit = () => {
    setProcessingWithdraw(true);

    setTimeout(() => {
      setProcessingWithdraw(false);
      setShowWithdrawSheet(false);
    }, 1400);
  };

  const handlePresetPress = (preset: WithdrawPresetValue) => {
    if (preset === "ALL") {
      setWithdrawAmount(String(AVAILABLE_BALANCE));
      return;
    }

    setWithdrawAmount(String(preset));
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text allowFontScaling={false} style={styles.pageTitle}>Earnings</Text>

        <EarningsBalanceCard
          availableBalanceLabel="Tk 12,450"
          onPayoutInfoPress={() => navigation.navigate("CookPayout")}
          onWithdrawPress={() => setShowWithdrawSheet(true)}
          pendingSettlementLabel="Tk 3,200 pending settlement"
        />

        <View style={styles.statsRow}>
          <EarningsStatSummaryCard
            deltaLabel="+18%"
            deltaPositive
            label="This Week"
            valueLabel="Tk 12,450"
          />
          <EarningsStatSummaryCard
            deltaLabel="+22%"
            deltaPositive
            label="This Month"
            valueLabel="Tk 48,200"
          />
          <EarningsStatSummaryCard
            deltaLabel="284 total"
            deltaPositive
            label="Total Orders"
            valueLabel="284"
          />
        </View>

        <EarningsTrendCard
          monthValues={monthValues}
          onRangeChange={setTrendRange}
          selectedRange={trendRange}
          weekValues={weekValues}
        />

        <EarningsFeeNoteCard
          description="Payouts are processed every Monday to your bKash account."
          title="Khabar charges a 10% platform fee per order."
        />
      </ScrollView>

      <DashboardBottomMenu activeKey="earnings" containerStyle={styles.bottomNav} onTabPress={handleBottomTabPress} />

      <EarningsWithdrawSheet
        amount={withdrawAmount}
        availableLabel="Tk 12,450"
        destinationLabel="bKash +880 1XXXXXXXXX"
        isProcessing={processingWithdraw}
        onAmountChange={setWithdrawAmount}
        onClose={() => setShowWithdrawSheet(false)}
        onPresetPress={handlePresetPress}
        onSubmit={handleWithdrawSubmit}
        presets={WITHDRAW_PRESETS}
        submitDisabled={submitDisabled}
        visible={showWithdrawSheet}
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
    gap: 12,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  pageTitle: {
    color: "#0F172A",
    fontSize: 40 / 1.8,
    fontWeight: "800",
    lineHeight: 28,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
  },
  bottomNav: {
    marginTop: "auto",
  },
});
