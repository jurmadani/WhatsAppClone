import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import BottomTabNavigator from "./BottomTabNavigator";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator<StackNavigatorTypes>();

/*
        const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

*/

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
