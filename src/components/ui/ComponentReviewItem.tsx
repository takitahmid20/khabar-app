import { StyleSheet, Switch, Text, View } from "react-native";

import { COLORS, RADIUS, SPACING } from "../../constants";
import type { ComponentCandidate } from "../../types/componentCatalog";
import Card from "./Card";

type ComponentReviewItemProps = {
  item: ComponentCandidate;
  isConfirmed: boolean;
  onToggle: (itemId: string) => void;
};

export default function ComponentReviewItem({
  item,
  isConfirmed,
  onToggle,
}: ComponentReviewItemProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.path}>{item.recommendedPath}</Text>
        </View>

        <View
          style={[
            styles.confidenceBadge,
            item.confidence === "high" ? styles.highConfidence : styles.mediumConfidence,
          ]}
        >
          <Text style={styles.badgeText}>{item.confidence}</Text>
        </View>
      </View>

      <Text style={styles.purpose}>{item.purpose}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Used in {item.appearsIn} screen nodes</Text>
        <Switch
          trackColor={{ false: COLORS.gray, true: COLORS.primary }}
          thumbColor={COLORS.white}
          value={isConfirmed}
          onValueChange={() => onToggle(item.id)}
        />
      </View>

      <View style={styles.variantsWrap}>
        {item.variants.map((variant) => (
          <View key={`${item.id}-${variant}`} style={styles.variantChip}>
            <Text style={styles.variantText}>{variant}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: SPACING.sm,
  },
  headerRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleBlock: {
    flex: 1,
    gap: SPACING.xs,
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "700",
  },
  path: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
  },
  confidenceBadge: {
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  highConfidence: {
    backgroundColor: COLORS.primary,
  },
  mediumConfidence: {
    backgroundColor: COLORS.gray,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  purpose: {
    color: COLORS.black,
    fontSize: 13,
    lineHeight: 18,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
  },
  variantsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
  },
  variantChip: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  variantText: {
    color: COLORS.black,
    fontSize: 11,
    fontWeight: "600",
  },
});
