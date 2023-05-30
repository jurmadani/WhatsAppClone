import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import BottomTabNavigator from "./BottomTabNavigator";
import ChatScreen from "../screens/ChatScreen";
import { Avatar } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => {
          return {
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Ionicons
                    name="chevron-back"
                    size={35}
                    color={"#3396FD"}
                    style={{ right: 10 }}
                  />
                </TouchableOpacity>
                <Avatar
                  source={{ uri: route.params?.item.user.image }}
                  style={{ height: 38, width: 38 }}
                />
                <Text
                  style={{ fontSize: 16, fontWeight: "600", paddingLeft: 10 }}
                >
                  {route.params?.item.user.name}
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Ionicons
                    name="ios-videocam-outline"
                    size={30}
                    color={"#3396FD"}
                    style={{ marginRight: 15 }}

                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="ios-call-outline"
                    size={28}
                    color={"#3396FD"}
                  />
                </TouchableOpacity>
              </View>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
