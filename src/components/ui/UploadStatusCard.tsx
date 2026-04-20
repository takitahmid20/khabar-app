import { Feather } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type UploadStatus = "pending" | "uploading" | "uploaded";

type UploadStatusCardProps = {
  title: string;
  description: string;
  status?: UploadStatus;
  actionLabel?: string;
  onActionPress?: PressableProps["onPress"];
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

export default function UploadStatusCard({
  title,
  description,
  status = "pending",
  actionLabel,
  onActionPress,
  containerStyle,
  titleStyle,
  descriptionStyle,
}: UploadStatusCardProps) {
  const isPending = status === "pending";
  const isUploading = status === "uploading";
  const isUploaded = status === "uploaded";

  const resolvedLabel = actionLabel ?? (isPending ? "Upload" : isUploading ? "Uploading..." : "Uploaded");

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={[styles.statusIconWrap, isUploaded ? styles.statusIconWrapUploaded : null]}>
        {isUploaded ? (
            <Feather color={COLORS.primarySoft} name="check" size={16} />
        ) : (
            <Feather color={COLORS.textMuted} name="upload" size={16} />
        )}
      </View>

      <View style={styles.contentBlock}>
        <Text allowFontScaling={false} style={[styles.title, titleStyle]}>{title}</Text>
        <Text allowFontScaling={false} style={[styles.description, descriptionStyle]}>{description}</Text>
      </View>

      <Pressable
        disabled={isUploading || !onActionPress}
        onPress={onActionPress}
        style={({ pressed }) => [
          styles.actionPill,
          isPending ? styles.actionPending : styles.actionUploaded,
          pressed && !isUploading && onActionPress ? styles.actionPressed : null,
          isUploading ? styles.actionUploading : null,
        ]}
      >
        {isUploading ? <ActivityIndicator color={COLORS.primarySoft} size="small" /> : null}
        <Text allowFontScaling={false} style={[styles.actionText, isPending ? styles.actionTextPending : styles.actionTextUploaded]}>
          {resolvedLabel}
        </Text>
        {isUploaded ? <Feather color={COLORS.primarySoft} name="check" size={15} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    flexDirection: "row",
    minHeight: 110,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  statusIconWrap: {
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: 18,
    height: 64,
    justifyContent: "center",
    marginRight: 16,
    width: 64,
  },
  statusIconWrapUploaded: {
    backgroundColor: COLORS.successSoft,
  },
  contentBlock: {
    flex: 1,
    minWidth: 1,
  },
  title: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    marginBottom: 2,
  },
  description: {
    color: "#96A0AF",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
  actionPill: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginLeft: 10,
    minHeight: 40,
    minWidth: 116,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionPending: {
    backgroundColor: COLORS.primarySoft,
  },
  actionUploaded: {
    backgroundColor: "#E7F3EA",
  },
  actionUploading: {
    opacity: 0.85,
  },
  actionPressed: {
    opacity: 0.9,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  actionTextPending: {
    color: COLORS.white,
  },
  actionTextUploaded: {
    color: COLORS.primarySoft,
  },
});
