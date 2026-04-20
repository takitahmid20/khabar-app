import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ComponentCatalogScreen from "../screens/ComponentCatalogScreen";
import CookIdentityVerificationScreen from "../screens/CookIdentityVerificationScreen";
import CookNameScreen from "../screens/CookNameScreen";
import CookCompleteScreen from "../screens/CookCompleteScreen";
import CookOrdersScreen from "../screens/CookOrdersScreen";
import CookPayoutScreen from "../screens/CookPayoutScreen";
import CookProfileDetailsScreen from "../screens/CookProfileDetailsScreen";
import CookServiceAreaScreen from "../screens/CookServiceAreaScreen";
import CookSpecialtiesScreen from "../screens/CookSpecialtiesScreen";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import CustomerProfileScreen from "../screens/CustomerProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import SignupScreen from "../screens/SignupScreen";
import type { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="ComponentCatalog"
      >
        <Stack.Screen name="ComponentCatalog" component={ComponentCatalogScreen} />
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboardScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="CookName" component={CookNameScreen} />
        <Stack.Screen name="CookProfileDetails" component={CookProfileDetailsScreen} />
        <Stack.Screen name="CookSpecialties" component={CookSpecialtiesScreen} />
        <Stack.Screen name="CookServiceArea" component={CookServiceAreaScreen} />
        <Stack.Screen name="CookIdentityVerification" component={CookIdentityVerificationScreen} />
        <Stack.Screen name="CookPayout" component={CookPayoutScreen} />
        <Stack.Screen name="CookComplete" component={CookCompleteScreen} />
        <Stack.Screen name="CookOrders" component={CookOrdersScreen} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
