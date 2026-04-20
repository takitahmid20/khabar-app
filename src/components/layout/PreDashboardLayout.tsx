import type { ReactNode } from "react";
import { Feather } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants";
import { Button, IconButton } from "../ui";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type PreDashboardLayoutProps = {
  topTitle: string;
  topSubtitle?: string;
  progress?: number;
  onBack?: () => void;
  children: ReactNode;
  actionLabel: string;
  onActionPress: () => void;
  actionDisabled?: boolean;
  actionRightIconName?: FeatherIconName;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actionTextStyle?: StyleProp<TextStyle>;
  bottomNote?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  mainContentStyle?: StyleProp<ViewStyle>;
};

export default function PreDashboardLayout({
  topTitle,
  topSubtitle,
  progress,
  onBack,
  children,
  actionLabel,
  onActionPress,
  actionDisabled,
  actionRightIconName,
  actionContainerStyle,
  actionTextStyle,
  bottomNote,
  contentContainerStyle,
  mainContentStyle,
}: PreDashboardLayoutProps) {
  const clampedProgress = progress === undefined ? undefined : Math.min(1, Math.max(0, progress));

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 0}
        style={styles.keyboardWrap}
      >
        <View style={styles.topBar}>
          {onBack ? <IconButton iconName="arrow-left" onPress={onBack} /> : null}

          <View style={styles.topTextWrap}>
            <Text style={styles.topTitle}>{topTitle}</Text>
            {topSubtitle ? <Text style={styles.topSubtitle}>{topSubtitle}</Text> : null}
          </View>
        </View>

        {clampedProgress !== undefined ? (
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${clampedProgress * 100}%` }]} />
          </View>
        ) : null}

        <View style={[styles.contentContainer, contentContainerStyle]}>
          <View style={[styles.mainContent, mainContentStyle]}>{children}</View>

          <View style={styles.bottomActions}>
            <Button
              containerStyle={[styles.actionButton, actionContainerStyle]}
              disabled={actionDisabled}
              fullWidth
              onPress={onActionPress}
              rightIconName={actionRightIconName}
              title={actionLabel}
              textStyle={[styles.actionButtonText, actionTextStyle]}
            />

            {bottomNote ? <View style={styles.bottomNoteWrap}>{bottomNote}</View> : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.surfaceAlt,
    flex: 1,
  },
  keyboardWrap: {
    flex: 1,
  },
  topBar: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 96,
    paddingBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  topTextWrap: {
    gap: 2,
  },
  topTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 26,
  },
  topSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
  },
  progressTrack: {
    backgroundColor: COLORS.border,
    height: 4,
  },
  progressFill: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 36,
  },
  mainContent: {
    gap: 24,
  },
  bottomActions: {
    marginTop: "auto",
    paddingBottom: 4,
  },
  actionButton: {
    borderRadius: 16,
    minHeight: 56,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  bottomNoteWrap: {
    marginTop: 14,
  },
});