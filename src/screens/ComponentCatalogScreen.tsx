import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OptionCardButton } from "../components/ui";
import type { RootStackParamList } from "../types";

export default function ComponentCatalogScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { height } = useWindowDimensions();
  const isCompactHeight = height < 760;

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.brandingSection, isCompactHeight ? styles.brandingSectionCompact : null]}>
          <View style={[styles.logoCard, isCompactHeight ? styles.logoCardCompact : null]}>
            <MaterialCommunityIcons color="#2D6A4F" name="silverware-fork-knife" size={29} />
          </View>

          <Text style={[styles.title, isCompactHeight ? styles.titleCompact : null]}>Welcome to Khabar</Text>
          <Text style={[styles.subtitle, isCompactHeight ? styles.subtitleCompact : null]}>
            How would you like to continue?
          </Text>
        </View>

        <View style={[styles.bottomSheet, isCompactHeight ? styles.bottomSheetCompact : null]}>
          <OptionCardButton
            compact={isCompactHeight}
            description="Order fresh home-cooked meals from trusted cooks near you"
            icon={<Feather color="#2D6A4F" name="shopping-bag" size={24} />}
            onPress={() => navigation.navigate("Signup", { role: "customer" })}
            title="I'm a Customer"
            variant="light"
          />

          <OptionCardButton
            compact={isCompactHeight}
            description="Share your cooking, earn from home, build your own food brand"
            icon={<MaterialCommunityIcons color="#74C69D" name="chef-hat" size={24} />}
            onPress={() => navigation.navigate("Signup", { role: "cook" })}
            title="I'm a Home Cook"
            variant="dark"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#1B4332",
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  brandingSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  brandingSectionCompact: {
    justifyContent: "flex-start",
    paddingTop: 28,
  },
  logoCard: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    height: 55.999,
    justifyContent: "center",
    marginBottom: 26,
    shadowColor: "#000000",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    width: 55.999,
  },
  logoCardCompact: {
    marginBottom: 18,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 35,
  },
  titleCompact: {
    fontSize: 22,
    lineHeight: 30,
  },
  subtitle: {
    color: "#95D5B2",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    marginTop: 8,
  },
  subtitleCompact: {
    marginTop: 4,
  },
  bottomSheet: {
    backgroundColor: "#F7F8FA",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 20,
  },
  bottomSheetCompact: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 16,
    paddingTop: 14,
  },
});
