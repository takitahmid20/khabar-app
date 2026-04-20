export type RootStackParamList = {
  ComponentCatalog: undefined;
  CustomerDashboard: undefined;
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
  CustomerProfile: undefined;
};
