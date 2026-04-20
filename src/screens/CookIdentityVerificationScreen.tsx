import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";

import { StepFlowLayout } from "../components/layout";
import { COLORS, SPACING } from "../constants";
import { StatusBanner, UploadStatusCard } from "../components/ui";
import type { RootStackParamList } from "../types";

export default function CookIdentityVerificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [nidStatus, setNidStatus] = useState<"pending" | "uploading" | "uploaded">("pending");
  const [kitchenStatus, setKitchenStatus] = useState<"pending" | "uploading" | "uploaded">("pending");

  const isReadyToSubmit = nidStatus === "uploaded" && kitchenStatus === "uploaded";

  const pickImageAndMarkUploaded = async (
    setStatus: (status: "pending" | "uploading" | "uploaded") => void,
  ) => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow photo library access to upload verification documents.");
        return;
      }

      setStatus("uploading");
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: "images",
        quality: 0.8,
      });

      if (result.canceled || result.assets.length === 0) {
        setStatus("pending");
        return;
      }

      setStatus("uploaded");
    } catch {
      setStatus("pending");
      Alert.alert("Upload failed", "Could not upload the document. Please try again.");
    }
  };

  const primaryActionLabel = useMemo(() => {
    if (isReadyToSubmit) {
      return "Submit for Verification";
    }

    return "Skip for now";
  }, [isReadyToSubmit]);

  return (
    <StepFlowLayout
      actionLabel={primaryActionLabel}
      onActionPress={() => navigation.navigate("CookPayout")}
      currentStep={4}
      sectionLabel="Verification"
      totalSteps={6}
      contentContainerStyle={styles.contentContainer}
      actionContainerStyle={styles.actionButton}
      actionTextStyle={styles.actionText}
    >
      <Text allowFontScaling={false} style={styles.heading}>Identity and Kitchen Verification</Text>
      <Text allowFontScaling={false} style={styles.description}>We verify every cook to ensure trust and safety for our community.</Text>

      <StatusBanner
        containerStyle={styles.noticeBanner}
        message="Your documents are encrypted and only used for verification. This usually takes 24-48 hours."
        messageStyle={styles.noticeText}
        tone="warning"
      />

      <View style={styles.cardsWrap}>
        <UploadStatusCard
          actionLabel={nidStatus === "uploaded" ? "Uploaded" : "Upload"}
          description="Front and back of your NID card"
          onActionPress={() => pickImageAndMarkUploaded(setNidStatus)}
          status={nidStatus}
          title="National ID (NID)"
        />

        <UploadStatusCard
          actionLabel={kitchenStatus === "uploaded" ? "Uploaded" : "Upload"}
          description="Clear photo of your cooking space"
          onActionPress={() => pickImageAndMarkUploaded(setKitchenStatus)}
          status={kitchenStatus}
          title="Kitchen Photo"
        />
      </View>
    </StepFlowLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  heading: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 23,
  },
  description: {
    color: "#7A8594",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  noticeBanner: {
    borderRadius: 14,
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  noticeText: {
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 16,
  },
  cardsWrap: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    minHeight: 50,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
});
