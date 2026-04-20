import { Feather } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageStyle,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type ImageUploadTriggerProps = Omit<PressableProps, "style"> & {
  label?: string;
  iconName?: FeatherIconName;
  imageUri?: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export default function ImageUploadTrigger({
  label = "Add a photo",
  iconName = "user",
  imageUri,
  containerStyle,
  buttonStyle,
  imageStyle,
  labelStyle,
  disabled,
  ...rest
}: ImageUploadTriggerProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          disabled ? styles.buttonDisabled : null,
          pressed && !disabled ? styles.buttonPressed : null,
          buttonStyle,
        ]}
        {...rest}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={[styles.imagePreview, imageStyle]} />
        ) : (
          <Feather color={COLORS.primarySoft} name={iconName} size={22} />
        )}
      </Pressable>

      <Text style={[styles.label, disabled ? styles.labelDisabled : null, labelStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    gap: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#CDEFD8",
    borderColor: "#9ED7B0",
    borderRadius: 999,
    borderWidth: 1,
    height: 72,
    justifyContent: "center",
    width: 72,
  },
  imagePreview: {
    borderRadius: 999,
    height: "100%",
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  label: {
    color: COLORS.primarySoft,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  labelDisabled: {
    color: COLORS.textMuted,
  },
});