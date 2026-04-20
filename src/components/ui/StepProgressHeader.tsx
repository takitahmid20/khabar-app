import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type StepProgressHeaderProps = {
  currentStep: number;
  totalSteps: number;
  sectionLabel: string;
  markCurrentAsComplete?: boolean;
};

export default function StepProgressHeader({
  currentStep,
  totalSteps,
  sectionLabel,
  markCurrentAsComplete,
}: StepProgressHeaderProps) {
  const safeTotal = Math.max(1, totalSteps);
  const safeCurrent = Math.min(Math.max(1, currentStep), safeTotal);

  return (
    <View style={styles.wrapper}>
      <View style={styles.metaRow}>
        <Text allowFontScaling={false} style={styles.stepText}>{`Step ${safeCurrent} of ${safeTotal}`}</Text>
        <Text allowFontScaling={false} style={styles.sectionLabel}>{sectionLabel}</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${(safeCurrent / safeTotal) * 100}%` }]} />
      </View>

      <View style={styles.circlesRow}>
        {Array.from({ length: safeTotal }, (_, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepNumber === safeCurrent;
          const isComplete = stepNumber < safeCurrent || (isCurrent && Boolean(markCurrentAsComplete));
          const isActive = isCurrent && !isComplete;

          return (
            <View
              key={`step-dot-${stepNumber}`}
              style={[styles.circle, isActive ? styles.circleActive : null, isComplete ? styles.circleComplete : null]}
            >
              {isComplete ? (
                <Feather color={COLORS.white} name="check" size={15} />
              ) : (
                <Text allowFontScaling={false} style={[styles.circleText, isActive ? styles.circleTextActive : null]}>{stepNumber}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.surfaceAlt,
    gap: 10,
    paddingBottom: 16,
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepText: {
    color: "#7A8594",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  sectionLabel: {
    color: COLORS.primarySoft,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  track: {
    backgroundColor: COLORS.border,
    borderRadius: 999,
    height: 7,
    overflow: "hidden",
  },
  fill: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    height: 7,
  },
  circlesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 4,
  },
  circle: {
    alignItems: "center",
    backgroundColor: "#D9DEE6",
    borderRadius: 999,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  circleActive: {
    backgroundColor: COLORS.primarySoft,
  },
  circleComplete: {
    backgroundColor: "#73B98D",
  },
  circleText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  circleTextActive: {
    color: COLORS.white,
  },
});