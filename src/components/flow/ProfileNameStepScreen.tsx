import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS } from "../../constants";
import type { RootStackParamList } from "../../types";
import { PreDashboardLayout } from "../layout";
import { ImageUploadTrigger, StatusBanner, TextInputField } from "../ui";

type ProfileRole = "cook" | "customer";

type ProfileNameStepScreenProps = {
  role: ProfileRole;
  onNext: (displayName: string) => void;
};

export default function ProfileNameStepScreen({ role, onNext }: ProfileNameStepScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [displayName, setDisplayName] = useState("");
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  const isCook = role === "cook";
  const trimmedName = displayName.trim();

  const subtitle = isCook ? "Cook registration" : "Customer sign in";
  const helperText = isCook
    ? "Your real name helps customers trust you."
    : "Your real name helps cooks know who they're cooking for.";
  const placeholder = isCook ? "e.g. Rina Begum" : "e.g. Tariq Hasan";

  const bannerMessage = useMemo(
    () => "After sign-up, you'll complete your kitchen profile and verification before going live.",
    [],
  );

  const handlePickPhoto = async () => {
    try {
      const permissionResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResponse.granted) {
        Alert.alert("Permission needed", "Please allow photo library access to upload your profile photo.");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        mediaTypes: "images",
        quality: 0.8,
      });

      if (pickerResult.canceled || pickerResult.assets.length === 0) {
        return;
      }

      setPhotoUri(pickerResult.assets[0].uri);
    } catch {
      Alert.alert("Upload failed", "Could not select a photo. Please try again.");
    }
  };

  return (
    <PreDashboardLayout
      actionContainerStyle={styles.actionButton}
      actionDisabled={!trimmedName}
      actionLabel="Let's Go"
      actionRightIconName="arrow-right"
      actionTextStyle={styles.actionButtonText}
      onActionPress={() => onNext(trimmedName)}
      onBack={() => navigation.goBack()}
      progress={1}
      topSubtitle={subtitle}
      topTitle="Set up profile"
      mainContentStyle={styles.mainContent}
    >
      <ImageUploadTrigger
        imageUri={photoUri}
        label={photoUri ? "Change photo" : "Add a photo"}
        onPress={handlePickPhoto}
      />

      <View style={styles.headingWrap}>
        <Text style={styles.heading}>What should we call you?</Text>
        <Text style={styles.description}>{helperText}</Text>
      </View>

      <TextInputField
        label=""
        onChangeText={setDisplayName}
        placeholder={placeholder}
        style={styles.nameInput}
        value={displayName}
        wrapperStyle={styles.nameInputWrap}
      />

      {isCook ? (
        <StatusBanner
          containerStyle={styles.infoBanner}
          leadingIconName="check-circle"
          message={bannerMessage}
          messageStyle={styles.infoBannerMessage}
          tone="success"
        />
      ) : null}
    </PreDashboardLayout>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    gap: 18,
  },
  headingWrap: {
    gap: 4,
    marginTop: 4,
  },
  heading: {
    color: "#111827",
    fontSize: 16.5,
    fontWeight: "700",
    lineHeight: 30,
  },
  description: {
    color: "#7A8594",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
  nameInputWrap: {
    gap: 0,
  },
  nameInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
    minHeight: 52,
    paddingHorizontal: 14,
  },
  infoBanner: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  infoBannerMessage: {
    color: COLORS.primarySoft,
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 16,
  },
  actionButton: {
    borderRadius: 12,
    minHeight: 50,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
});