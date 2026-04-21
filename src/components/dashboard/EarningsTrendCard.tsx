import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

import { COLORS } from "../../constants";
import { Card, SelectableChip } from "../ui";

type TrendRange = "week" | "month";

type EarningsTrendCardProps = {
  weekValues: number[];
  monthValues: number[];
  selectedRange: TrendRange;
  onRangeChange: (range: TrendRange) => void;
};

const CHART_WIDTH = 252;
const CHART_HEIGHT = 120;
const CHART_PADDING_X = 8;
const CHART_PADDING_Y = 10;

export default function EarningsTrendCard({
  weekValues,
  monthValues,
  selectedRange,
  onRangeChange,
}: EarningsTrendCardProps) {
  const values = selectedRange === "week" ? weekValues : monthValues;

  const chart = useMemo(() => {
    if (values.length < 2) {
      return {
        labels: [],
        path: "",
        points: [],
        yAxis: [0, 0, 0, 0, 0],
      };
    }

    const maxValue = Math.max(...values, 1);
    const topAxis = Math.ceil(maxValue / 600) * 600;
    const range = Math.max(topAxis, 1);

    const xStep = (CHART_WIDTH - CHART_PADDING_X * 2) / (values.length - 1);
    const points = values.map((value, index) => {
      const x = CHART_PADDING_X + xStep * index;
      const y = CHART_HEIGHT - CHART_PADDING_Y - (value / range) * (CHART_HEIGHT - CHART_PADDING_Y * 2);
      return { x, y };
    });

    const path = points
      .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
      .join(" ");

    const yAxis = [topAxis, Math.round(topAxis * 0.75), Math.round(topAxis * 0.5), Math.round(topAxis * 0.25), 0];

    return {
      labels: selectedRange === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
      path,
      points,
      yAxis,
    };
  }, [selectedRange, values]);

  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        <Text allowFontScaling={false} style={styles.titleText}>Revenue Trend</Text>

        <View style={styles.rangeRow}>
          <SelectableChip
            containerStyle={styles.rangeChip}
            label="Week"
            onPress={() => onRangeChange("week")}
            selected={selectedRange === "week"}
            textStyle={styles.rangeChipText}
          />
          <SelectableChip
            containerStyle={styles.rangeChip}
            label="Month"
            onPress={() => onRangeChange("month")}
            selected={selectedRange === "month"}
            textStyle={styles.rangeChipText}
          />
        </View>
      </View>

      <View style={styles.chartWrap}>
        <View style={styles.yAxisCol}>
          {chart.yAxis.map((label) => (
            <Text allowFontScaling={false} key={`axis-${label}`} style={styles.axisText}>{label}</Text>
          ))}
        </View>

        <View>
          <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
            {[0, 1, 2, 3, 4].map((row) => {
              const y = CHART_PADDING_Y + ((CHART_HEIGHT - CHART_PADDING_Y * 2) / 4) * row;
              return (
                <Line
                  key={`grid-${row}`}
                  stroke="#E5E7EB"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  x1={CHART_PADDING_X}
                  x2={CHART_WIDTH - CHART_PADDING_X}
                  y1={y}
                  y2={y}
                />
              );
            })}

            <Path d={chart.path} fill="none" stroke="#2D6A4F" strokeWidth={2.5} />

            {chart.points.map((point, index) => (
              <Circle
                key={`point-${index}`}
                cx={point.x}
                cy={point.y}
                fill={index === chart.points.length - 1 ? "#2D6A4F" : "#2D6A4F"}
                r={3.4}
              />
            ))}
          </Svg>

          <View style={styles.labelsRow}>
            {chart.labels.map((label) => (
              <Text allowFontScaling={false} key={`label-${label}`} style={styles.labelText}>{label}</Text>
            ))}
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#1F2937",
    fontSize: 24 / 1.4,
    fontWeight: "800",
    lineHeight: 22,
  },
  rangeRow: {
    flexDirection: "row",
    gap: 6,
  },
  rangeChip: {
    borderRadius: 10,
    minHeight: 28,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  rangeChipText: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  chartWrap: {
    flexDirection: "row",
    gap: 6,
  },
  yAxisCol: {
    alignItems: "flex-end",
    height: CHART_HEIGHT,
    justifyContent: "space-between",
    paddingBottom: 18,
    paddingTop: 8,
    width: 34,
  },
  axisText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 12,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    paddingHorizontal: CHART_PADDING_X - 2,
  },
  labelText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 12,
  },
});
