import { View, Text, Settings, Button, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigatorType } from "../types/navigation/BottomTabNavigatorTypes";
import ChatsScreen from "../screens/ChatsScreen";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import ChatsScreenHeader, {
  EditButton,
  NewConversationIcon,
} from "../components/ChatsScreenComponents/ChatsScreenHeader";
import NotImplementedYetScreen from "../screens/NotImplementedYetScreen";

const Tab = createBottomTabNavigator<BottomTabNavigatorType>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          backgroundColor: "whitesmoke",
          height: 90,
        },

        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === "Status") {
            iconName = "ios-sync-circle-outline";
          } else if (route.name === "Calls") {
            iconName = "call";
          } else if (route.name === "Contacts") {
            iconName = "ios-people";
          } else if (route.name === "Chats") {
            iconName = "ios-chatbubbles-sharp";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }

          return (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                //@ts-ignore
                name={iconName}
                size={28}
                color={focused ? "#3396FD" : "#C4C4C4"}
                style={{ marginTop: 7 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: focused ? "#3396FD" : "#C4C4C4",
                }}
              >
                {route.name}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Status" component={NotImplementedYetScreen} />
      <Tab.Screen name="Calls" component={NotImplementedYetScreen} />
      <Tab.Screen name="Contacts" component={NotImplementedYetScreen} />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation, route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const showTitle = offsetY > 56;
          return {
            headerLeft: () => <EditButton />,
            headerStyle: {
              backgroundColor: showTitle ? "whitesmoke" : "white",
            },
            headerShadowVisible: showTitle ? true : false,
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* camera icon */}
                <TouchableOpacity>
                  <Ionicons
                    //@ts-ignore
                    name={"camera-outline"}
                    size={29}
                    color={"#3396FD"}
                    style={{ marginRight: 25 }}
                  />
                </TouchableOpacity>

                {/* new conv icon */}
                <NewConversationIcon />
              </View>
            ),
            headerTitle: showTitle ? "Chats" : "", // Conditionally show/hide the title
            headerTitleStyle: {
              fontWeight: "bold",
            },
          };
        }}
      />

      <Tab.Screen name="Settings" component={NotImplementedYetScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
