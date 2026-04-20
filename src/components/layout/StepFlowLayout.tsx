import type { ReactNode } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants";
import { Button, IconButton, StepProgressHeader } from "../ui";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type StepFlowLayoutProps = {
  currentStep: number;
  totalSteps: number;
  sectionLabel: string;
  markCurrentStepAsComplete?: boolean;
  children: ReactNode;
  actionLabel: string;
  onActionPress: () => void;
  actionDisabled?: boolean;
  onBackPress?: () => void;
  showBackButton?: boolean;
  actionRightIconName?: FeatherIconName;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actionTextStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function StepFlowLayout({
  currentStep,
  totalSteps,
  sectionLabel,
  markCurrentStepAsComplete,
  children,
  actionLabel,
  onActionPress,
  actionDisabled,
  onBackPress,
  showBackButton = true,
  actionRightIconName,
  actionContainerStyle,
  actionTextStyle,
  contentContainerStyle,
}: StepFlowLayoutProps) {
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
        style={styles.keyboardWrap}
      >
        {showBackButton && (onBackPress || canGoBack) ? (
          <View style={styles.backButtonWrap}>
            <IconButton iconName="arrow-left" onPress={handleBackPress} />
          </View>
        ) : null}

        <StepProgressHeader
          currentStep={currentStep}
          markCurrentAsComplete={markCurrentStepAsComplete}
          sectionLabel={sectionLabel}
          totalSteps={totalSteps}
        />

        <View style={styles.divider} />

        <ScrollView
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        <View style={styles.bottomActionWrap}>
          <Button
            containerStyle={[styles.actionButton, actionContainerStyle]}
            disabled={actionDisabled}
            fullWidth
            onPress={onActionPress}
            rightIconName={actionRightIconName}
            title={actionLabel}
            textStyle={[styles.actionText, actionTextStyle]}
          />
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
  backButtonWrap: {
    alignItems: "flex-start",
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  divider: {
    backgroundColor: COLORS.border,
    height: 1,
  },
  contentContainer: {
    gap: 14,
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  bottomActionWrap: {
    backgroundColor: COLORS.surfaceAlt,
    paddingBottom: 18,
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  actionButton: {
    borderRadius: 16,
    minHeight: 52,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
});