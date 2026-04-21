import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type ToggleVisualState = {
  containerBackgroundColor: string;
  containerBorderColor: string;
  iconBackgroundColor: string;
  iconColor: string;
  iconName: FeatherIconName;
  title: string;
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
  trackColor: string;
};

type StatusToggleCardProps = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  enabledState: ToggleVisualState;
  disabledState: ToggleVisualState;
  pressToToggle?: boolean;
  iconSize?: number;
  iconContainerSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  contentWrapStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
};

export default function StatusToggleCard({
  enabled,
  onToggle,
  enabledState,
  disabledState,
  pressToToggle,
  iconSize = 18,
  iconContainerSize = 32,
  containerStyle,
  contentWrapStyle,
  titleStyle,
  subtitleStyle,
}: StatusToggleCardProps) {
  const stateConfig = enabled ? enabledState : disabledState;

  return (
    <Pressable
      disabled={!pressToToggle}
      onPress={pressToToggle ? () => onToggle(!enabled) : undefined}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: stateConfig.containerBackgroundColor,
          borderColor: stateConfig.containerBorderColor,
        },
        pressed && pressToToggle ? styles.pressed : null,
        containerStyle,
      ]}
    >
      <View style={[styles.leftWrap, contentWrapStyle]}>
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: stateConfig.iconBackgroundColor,
              height: iconContainerSize,
              width: iconContainerSize,
            },
          ]}
        >
          <Feather color={stateConfig.iconColor} name={stateConfig.iconName} size={iconSize} />
        </View>

        <View style={styles.textWrap}>
          <Text allowFontScaling={false} style={[styles.titleText, { color: stateConfig.titleColor }, titleStyle]}>
            {stateConfig.title}
          </Text>
          <Text allowFontScaling={false} style={[styles.subtitleText, { color: stateConfig.subtitleColor }, subtitleStyle]}>
            {stateConfig.subtitle}
          </Text>
        </View>
      </View>

      <Switch
        onValueChange={onToggle}
        thumbColor={COLORS.white}
        trackColor={{ false: "#D1D5DB", true: stateConfig.trackColor }}
        value={enabled}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 56,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.88,
  },
  leftWrap: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginRight: 10,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    marginRight: 8,
  },
  textWrap: {
    flexShrink: 1,
  },
  titleText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    marginTop: 1,
  },
});