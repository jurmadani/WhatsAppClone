import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<StackNavigatorTypes>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
