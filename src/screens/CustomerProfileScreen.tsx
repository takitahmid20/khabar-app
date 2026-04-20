import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ProfileNameStepScreen } from "../components/flow";
import type { RootStackParamList } from "../types";

export default function CustomerProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ProfileNameStepScreen
      role="customer"
      onNext={() => navigation.navigate("CustomerDashboard")}
    />
  );
}
