export type RootStackParamList = {
  ComponentCatalog: undefined;
  CustomerDashboard: undefined;
  CustomerSearch: undefined;
  CustomerCookDetails:
    | {
      cookId?: string;
    }
    | undefined;
  CustomerMonthlyPlan: {
    cookId?: string;
    cookName: string;
    menuByDay: Array<{
      dayLabel: string;
      items: Array<{
        key: string;
        name: string;
        mealSlot: "breakfast" | "lunch" | "dinner";
        description: string;
        priceLabel: string;
        imageUri: string;
        showPopular?: boolean;
        addOnsLabel?: string;
      }>;
    }>;
  };
  CustomerCheckout: {
    cookId?: string;
    cookName: string;
    items: Array<{
      dayLabel: string;
      dishKey: string;
      dishName: string;
      mealSlot: "breakfast" | "lunch" | "dinner";
      imageUri: string;
      unitPrice: number;
      quantity: number;
      monthMultiplier: number;
      planType?: "today" | "monthly";
    }>;
  };
  CustomerCheckoutDetails: {
    cookId?: string;
    cookName: string;
    items: Array<{
      dayLabel: string;
      dishKey: string;
      dishName: string;
      mealSlot: "breakfast" | "lunch" | "dinner";
      imageUri: string;
      unitPrice: number;
      quantity: number;
      monthMultiplier: number;
      planType?: "today" | "monthly";
    }>;
  };
  CookEarnings: undefined;
  CookProfile: undefined;
  CookMenu: undefined;
  CookOrders: undefined;
  Home: undefined;
  Login: undefined;
  Signup: { role: "customer" | "cook" };
  OtpVerification: {
    role: "customer" | "cook";
    method: "mobile" | "email";
    destination: string;
  };
  CookName: undefined;
  CookProfileDetails: { displayName?: string } | undefined;
  CookSpecialties: undefined;
  CookServiceArea: undefined;
  CookIdentityVerification: undefined;
  CookPayout: undefined;
  CookComplete: undefined;
  CustomerProfile:
    | {
      mode?: "onboarding" | "profile";
    }
    | undefined;
};
