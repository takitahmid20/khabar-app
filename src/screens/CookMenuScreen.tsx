import { StackActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  DashboardBottomMenu,
  type DashboardBottomMenuTabKey,
  MenuDayChip,
  type MenuDish,
  type MealSlot,
  MenuDishCard,
  MenuEmptyState,
} from "../components/dashboard";
import { ScreenContainer } from "../components/layout";
import { Button, FormSheet, ImageUploadTrigger, SelectableChip, TextInputField } from "../components/ui";
import { COLORS, RADIUS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type DayMeta = {
  key: DayKey;
  shortLabel: string;
  fullLabel: string;
};

type WeeklyMenuMap = Record<DayKey, MenuDish[]>;

const DAY_META: DayMeta[] = [
  { key: "sat", shortLabel: "Sat", fullLabel: "Saturday" },
  { key: "sun", shortLabel: "Sun", fullLabel: "Sunday" },
  { key: "mon", shortLabel: "Mon", fullLabel: "Monday" },
  { key: "tue", shortLabel: "Tue", fullLabel: "Tuesday" },
  { key: "wed", shortLabel: "Wed", fullLabel: "Wednesday" },
  { key: "thu", shortLabel: "Thu", fullLabel: "Thursday" },
  { key: "fri", shortLabel: "Fri", fullLabel: "Friday" },
];

const MEAL_SLOT_OPTIONS: MealSlot[] = ["Breakfast", "Lunch", "Dinner"];

const DISH_IMAGE_URI = {
  biryani:
    "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=350&q=60",
  fish:
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=350&q=60",
  curry:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=350&q=60",
} as const;

const INITIAL_MENU: WeeklyMenuMap = {
  mon: [
    {
      id: "mon-kacchi",
      name: "Kacchi Biryani",
      category: "Biryani",
      mealSlot: "Lunch",
      price: 180,
      imageUri: DISH_IMAGE_URI.biryani,
      available: true,
      cutoffLabel: "Cutoff 10 AM",
      description: "Aromatic kacchi with potato and egg.",
    },
    {
      id: "mon-curry-rice",
      name: "Chicken Curry Rice",
      category: "Rice & Curry",
      mealSlot: "Lunch",
      price: 120,
      imageUri: DISH_IMAGE_URI.curry,
      available: true,
      cutoffLabel: "Cutoff 10 AM",
      description: "Home style chicken curry with steamed rice.",
    },
  ],
  tue: [
    {
      id: "tue-fish-rice",
      name: "Fish Curry Rice",
      category: "Rice & Curry",
      mealSlot: "Lunch",
      price: 150,
      imageUri: DISH_IMAGE_URI.fish,
      available: true,
      cutoffLabel: "Cutoff 10 AM",
    },
    {
      id: "tue-kacchi",
      name: "Kacchi Biryani",
      category: "Biryani",
      mealSlot: "Lunch",
      price: 180,
      imageUri: DISH_IMAGE_URI.biryani,
      available: true,
      cutoffLabel: "Cutoff 10 AM",
    },
  ],
  wed: [
    {
      id: "wed-fish-rice",
      name: "Fish Curry Rice",
      category: "Rice & Curry",
      mealSlot: "Lunch",
      price: 150,
      imageUri: DISH_IMAGE_URI.fish,
      available: true,
      cutoffLabel: "Cutoff 10 AM",
    },
    {
      id: "wed-chicken-rice",
      name: "Chicken Curry Rice",
      category: "Rice & Curry",
      mealSlot: "Lunch",
      price: 120,
      imageUri: DISH_IMAGE_URI.curry,
      available: true,
      cutoffLabel: "Cutoff 10 AM",
    },
  ],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
};

type MenuDishFormValues = {
  name: string;
  description: string;
  price: string;
  category: string;
  mealSlot: MealSlot;
  imageUri?: string;
};

const EMPTY_DISH_DRAFT: MenuDishFormValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  mealSlot: "Lunch",
  imageUri: undefined,
};

export default function CookMenuScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedDay, setSelectedDay] = useState<DayKey>("sat");
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenuMap>(INITIAL_MENU);
  const [showEditor, setShowEditor] = useState(false);
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [dishDraft, setDishDraft] = useState<MenuDishFormValues>(EMPTY_DISH_DRAFT);

  const switchRootScreen = (screenName: keyof RootStackParamList) => {
    navigation.dispatch(StackActions.replace(screenName));
  };

  const selectedDayMeta = useMemo(
    () => DAY_META.find((day) => day.key === selectedDay) ?? DAY_META[0],
    [selectedDay],
  );

  const selectedDayDishes = weeklyMenu[selectedDay];

  const saveDisabled =
    dishDraft.name.trim().length === 0 ||
    dishDraft.price.trim().length === 0 ||
    Number.isNaN(Number(dishDraft.price)) ||
    Number(dishDraft.price) <= 0;

  const handleBottomTabPress = (tabKey: DashboardBottomMenuTabKey) => {
    if (tabKey === "dashboard") {
      switchRootScreen("Home");
      return;
    }

    if (tabKey === "orders") {
      switchRootScreen("CookOrders");
      return;
    }

    if (tabKey === "menu") {
      return;
    }

    if (tabKey === "profile") {
      switchRootScreen("CookName");
    }
  };

  const openAddDishSheet = () => {
    setEditingDishId(null);
    setDishDraft(EMPTY_DISH_DRAFT);
    setShowEditor(true);
  };

  const openEditDishSheet = (dish: MenuDish) => {
    setEditingDishId(dish.id);
    setDishDraft({
      name: dish.name,
      description: dish.description ?? "",
      price: String(dish.price),
      category: dish.category,
      mealSlot: dish.mealSlot,
      imageUri: dish.imageUri,
    });
    setShowEditor(true);
  };

  const closeDishSheet = () => {
    setShowEditor(false);
    setEditingDishId(null);
    setDishDraft(EMPTY_DISH_DRAFT);
  };

  const handlePickDishPhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow photo library access to upload your dish image.");
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

      setDishDraft((previous) => ({
        ...previous,
        imageUri: result.assets[0].uri,
      }));
    } catch {
      Alert.alert("Upload failed", "Could not select a dish photo. Please try again.");
    }
  };

  const handleSaveDish = () => {
    const normalizedCategory = dishDraft.category.trim().length > 0 ? dishDraft.category.trim() : "General";
    const normalizedName = dishDraft.name.trim();

    if (normalizedName.length === 0 || saveDisabled) {
      return;
    }

    setWeeklyMenu((previous) => {
      const currentDayItems = previous[selectedDay];
      const editingDish = editingDishId
        ? currentDayItems.find((item) => item.id === editingDishId)
        : undefined;

      const nextDish: MenuDish = {
        id: editingDishId ?? `${selectedDay}-${Date.now()}`,
        name: normalizedName,
        category: normalizedCategory,
        mealSlot: dishDraft.mealSlot,
        price: Number(dishDraft.price),
        imageUri:
          dishDraft.imageUri ??
          (normalizedCategory.toLowerCase().includes("fish")
            ? DISH_IMAGE_URI.fish
            : normalizedCategory.toLowerCase().includes("biryani")
              ? DISH_IMAGE_URI.biryani
              : DISH_IMAGE_URI.curry),
        available: editingDish?.available ?? true,
        cutoffLabel: "Cutoff 10 AM",
        description: dishDraft.description.trim(),
      };

      const nextItems = editingDishId
        ? currentDayItems.map((item) => (item.id === editingDishId ? nextDish : item))
        : [...currentDayItems, nextDish];

      return {
        ...previous,
        [selectedDay]: nextItems,
      };
    });

    closeDishSheet();
  };

  const handleDeleteDish = (dishId: string) => {
    setWeeklyMenu((previous) => ({
      ...previous,
      [selectedDay]: previous[selectedDay].filter((dish) => dish.id !== dishId),
    }));
  };

  const handleToggleDishAvailability = (dishId: string) => {
    setWeeklyMenu((previous) => ({
      ...previous,
      [selectedDay]: previous[selectedDay].map((dish) =>
        dish.id === dishId ? { ...dish, available: !dish.available } : dish,
      ),
    }));
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text allowFontScaling={false} style={styles.titleText}>Weekly Menu</Text>
            <Text allowFontScaling={false} style={styles.subtitleText}>
              Plan dishes by day and meal slot
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.dayChipsRow} horizontal showsHorizontalScrollIndicator={false}>
          {DAY_META.map((day) => (
            <MenuDayChip
              key={day.key}
              active={day.key === selectedDay}
              count={weeklyMenu[day.key].length}
              onPress={() => setSelectedDay(day.key)}
              shortLabel={day.shortLabel}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text allowFontScaling={false} style={styles.sectionTitleText}>
            {`${selectedDayMeta.fullLabel} - ${selectedDayDishes.length} dishes`}
          </Text>

          <Button
            containerStyle={styles.addDishButton}
            onPress={openAddDishSheet}
            rightIconName="plus"
            textStyle={styles.addDishText}
            title="Add Dish"
          />
        </View>

        {selectedDayDishes.length > 0 ? (
          <View style={styles.dishesWrap}>
            {selectedDayDishes.map((dish) => (
              <MenuDishCard
                key={dish.id}
                dish={dish}
                onDeletePress={() => handleDeleteDish(dish.id)}
                onEditPress={() => openEditDishSheet(dish)}
                onToggleAvailabilityPress={() => handleToggleDishAvailability(dish.id)}
              />
            ))}
          </View>
        ) : (
          <MenuEmptyState dayLabel={selectedDayMeta.fullLabel} onAddDishPress={openAddDishSheet} />
        )}
      </ScrollView>

      <DashboardBottomMenu activeKey="menu" containerStyle={styles.bottomNav} onTabPress={handleBottomTabPress} />

      <FormSheet
        onClose={closeDishSheet}
        onSubmit={handleSaveDish}
        submitDisabled={saveDisabled}
        submitLabel={editingDishId ? `Save ${selectedDayMeta.fullLabel} Menu` : `Add to ${selectedDayMeta.fullLabel} Menu`}
        title={`${editingDishId ? "Edit" : "Add"} Dish - ${selectedDayMeta.fullLabel}`}
        visible={showEditor}
      >
        <ImageUploadTrigger
          buttonStyle={styles.photoButton}
          iconName="camera"
          imageStyle={styles.photoPreview}
          imageUri={dishDraft.imageUri}
          label={dishDraft.imageUri ? "Change dish photo" : "Add dish photo"}
          labelStyle={styles.photoLabel}
          onPress={handlePickDishPhoto}
        />

        <View style={styles.inputGroup}>
          <Text allowFontScaling={false} style={styles.inputLabel}>Dish Name *</Text>
          <TextInputField
            label=""
            onChangeText={(value) => setDishDraft((previous) => ({ ...previous, name: value }))}
            placeholder="e.g. Kacchi Biryani"
            style={styles.singleLineInput}
            value={dishDraft.name}
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text allowFontScaling={false} style={styles.inputLabel}>Description</Text>
          <TextInputField
            label=""
            multiline
            onChangeText={(value) => setDishDraft((previous) => ({ ...previous, description: value }))}
            placeholder="What's in this dish?"
            style={styles.textAreaInput}
            textAlignVertical="top"
            value={dishDraft.description}
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <View style={styles.mealSlotWrap}>
          <Text allowFontScaling={false} style={styles.mealSlotLabel}>Meal Slot *</Text>
          <View style={styles.mealSlotRow}>
            {MEAL_SLOT_OPTIONS.map((slot) => {
              const active = dishDraft.mealSlot === slot;

              return (
                <SelectableChip
                  containerStyle={styles.mealSlotChip}
                  key={slot}
                  onPress={() => setDishDraft((previous) => ({ ...previous, mealSlot: slot }))}
                  selected={active}
                  label={slot}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.rowWrap}>
          <View style={[styles.inputGroup, styles.fieldFlex]}>
            <Text allowFontScaling={false} style={styles.inputLabel}>Price (Tk) *</Text>
            <TextInputField
              keyboardType="number-pad"
              label=""
              onChangeText={(value) => setDishDraft((previous) => ({ ...previous, price: value }))}
              placeholder="120"
              style={styles.singleLineInput}
              value={dishDraft.price}
              wrapperStyle={styles.inputWrapper}
            />
          </View>

          <View style={[styles.inputGroup, styles.fieldFlex]}>
            <Text allowFontScaling={false} style={styles.inputLabel}>Category</Text>
            <TextInputField
              label=""
              onChangeText={(value) => setDishDraft((previous) => ({ ...previous, category: value }))}
              placeholder="Biryani"
              style={styles.singleLineInput}
              value={dishDraft.category}
              wrapperStyle={styles.inputWrapper}
            />
          </View>
        </View>
      </FormSheet>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F3F4F6",
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: SPACING.md,
  },
  scrollContent: {
    gap: 12,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  headerRow: {
    alignItems: "flex-start",
  },
  headerTextWrap: {
    width: "100%",
  },
  titleText: {
    color: "#111827",
    fontSize: 39 / 1.8,
    fontWeight: "800",
    lineHeight: 27,
  },
  subtitleText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginTop: 2,
  },
  dayChipsRow: {
    alignItems: "flex-start",
    gap: 8,
    paddingBottom: 2,
    paddingTop: 2,
  },
  sectionHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitleText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
  },
  addDishButton: {
    borderRadius: 14,
    minWidth: 112,
    minHeight: 34,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  addDishText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  dishesWrap: {
    gap: 10,
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
  photoPreview: {
    borderRadius: 14,
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
    fontSize: 16,
    fontWeight: "500",
    minHeight: 52,
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
    minHeight: 100,
    paddingHorizontal: 14,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  mealSlotWrap: {
    gap: 6,
  },
  mealSlotLabel: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "500",
  },
  mealSlotRow: {
    flexDirection: "row",
    gap: 8,
  },
  mealSlotChip: {
    flex: 1,
  },
  rowWrap: {
    flexDirection: "row",
    gap: 10,
  },
  fieldFlex: {
    flex: 1,
  },
  bottomNav: {
    marginTop: "auto",
  },
});