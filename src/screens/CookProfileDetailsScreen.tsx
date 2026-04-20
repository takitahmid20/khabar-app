import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";

import { StepFlowLayout } from "../components/layout";
import { COLORS, RADIUS, SPACING } from "../constants";
import { ImageUploadTrigger, TextInputField } from "../components/ui";
import type { RootStackParamList } from "../types";

export default function CookProfileDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CookProfileDetails">>();

  const [kitchenPhotoUri, setKitchenPhotoUri] = useState<string | undefined>();
  const [kitchenName, setKitchenName] = useState("");
  const [aboutCooking, setAboutCooking] = useState("");

  const firstName = useMemo(() => {
    const rawName = route.params?.displayName?.trim();

    if (!rawName) {
      return "Chef";
    }

    return rawName.split(/\s+/)[0];
  }, [route.params?.displayName]);

  const canContinue = kitchenName.trim().length > 0 && aboutCooking.trim().length > 0 && Boolean(kitchenPhotoUri);

  const handlePickKitchenPhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow photo library access to upload your kitchen photo.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        mediaTypes: "images",
        quality: 0.8,
      });

      if (result.canceled || result.assets.length === 0) {
        return;
      }

      setKitchenPhotoUri(result.assets[0].uri);
    } catch {
      Alert.alert("Upload failed", "Could not select a kitchen photo. Please try again.");
    }
  };

  return (
    <StepFlowLayout
      actionDisabled={!canContinue}
      actionLabel="Continue"
      onActionPress={() => navigation.navigate("CookSpecialties")}
      actionRightIconName="arrow-right"
      actionContainerStyle={styles.actionButton}
      actionTextStyle={styles.actionButtonText}
      currentStep={1}
      sectionLabel="Personal Info"
      totalSteps={6}
      contentContainerStyle={styles.contentContainer}
    >
      <Text allowFontScaling={false} style={styles.heading}>Tell us about yourself</Text>
      <Text allowFontScaling={false} style={styles.description}>{`Welcome, ${firstName}! Let's set up your cook profile.`}</Text>

      <ImageUploadTrigger
        buttonStyle={styles.photoButton}
        iconName="camera"
        imageUri={kitchenPhotoUri}
        label={kitchenPhotoUri ? "Change kitchen photo" : "Add kitchen photo"}
        labelStyle={styles.photoLabel}
        onPress={handlePickKitchenPhoto}
      />

      <View style={styles.inputGroup}>
        <Text allowFontScaling={false} style={styles.inputLabel}>Kitchen / Brand Name</Text>
        <TextInputField
          label=""
          onChangeText={setKitchenName}
          placeholder="e.g. Rina's Kitchen"
          style={styles.singleLineInput}
          value={kitchenName}
          wrapperStyle={styles.inputWrapper}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text allowFontScaling={false} style={styles.inputLabel}>About your cooking</Text>
        <TextInputField
          autoCapitalize="sentences"
          label=""
          multiline
          onChangeText={setAboutCooking}
          placeholder="Share your cooking story, specialties, and what makes your food unique."
          style={styles.textAreaInput}
          value={aboutCooking}
          wrapperStyle={styles.inputWrapper}
        />
      </View>
    </StepFlowLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  heading: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 26,
  },
  description: {
    color: "#7A8594",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  photoButton: {
    alignSelf: "center",
    backgroundColor: "#D8F3DC",
    borderColor: "#74C69D",
    borderStyle: "dashed",
    borderWidth: 1,
    height: 88,
    width: 88,
  },
  photoLabel: {
    color: COLORS.primarySoft,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  inputWrapper: {
    gap: 0,
  },
  singleLineInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    color: "#111827",
    fontSize: 17,
    fontWeight: "500",
    minHeight: 56,
    paddingHorizontal: 14,
  },
  textAreaInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    color: "#111827",
    fontSize: 16,
    fontWeight: "500",
    minHeight: 120,
    paddingHorizontal: 14,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  actionButton: {
    borderRadius: 16,
    minHeight: 52,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
});
