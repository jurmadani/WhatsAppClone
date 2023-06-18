import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigatorType } from "../types/navigation/BottomTabNavigatorTypes";
import ChatsScreen from "../screens/ChatsScreen";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import NotImplementedYetScreen from "../screens/NotImplementedYetScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import NewConversationIcon from "../components/ChatsScreenComponents/NewConversationIcon";
import EditButton from "../components/ChatsScreenComponents/EditButton";
import CameraIcon from "../components/ChatsScreenComponents/CameraIcon";
import SettingsScreen from "../screens/SettingsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import CallsScreen from "../screens/CallsScreen";
import StatusScreen from "../screens/StatusScreen";

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
            iconName = focused ? "call" : "call-outline";
          } else if (route.name === "Contacts") {
            iconName = focused ? "ios-people" : "ios-people-outline";
          } else if (route.name === "Chats") {
            iconName = focused
              ? "ios-chatbubbles-sharp"
              : "ios-chatbubbles-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
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
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const showTitle = offsetY > 34.5;
          return {
            headerStyle: {
              backgroundColor: showTitle ? "whitesmoke" : "white",
            },
            headerShadowVisible: showTitle ? true : false,
            headerTitle: showTitle ? "Status" : "", // Conditionally show/hide the title
            headerTitleStyle: {
              fontWeight: "bold",
            },
          };
        }}
      />
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const showTitle = offsetY > 34.5;
          return {
            headerStyle: {
              backgroundColor: showTitle ? "whitesmoke" : "white",
            },
            headerShadowVisible: showTitle ? true : false,
            headerTitle: showTitle ? "Calls" : "", // Conditionally show/hide the title
            headerTitleStyle: {
              fontWeight: "bold",
            },
          };
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const showTitle = offsetY > 34.5;
          return {
            headerStyle: {
              backgroundColor: showTitle ? "whitesmoke" : "white",
            },
            headerShadowVisible: showTitle ? true : false,
            headerTitle: showTitle ? "Contacts" : "", // Conditionally show/hide the title
            headerTitleStyle: {
              fontWeight: "bold",
            },
          };
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ route }) => {
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
                <CameraIcon />
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

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const showTitle = offsetY > 56;
          return {
            headerStyle: {
              backgroundColor: showTitle ? "white" : "whitesmoke",
            },
            headerShadowVisible: showTitle ? true : false,

            headerTitle: showTitle ? "Settings" : "", // Conditionally show/hide the title
            headerTitleStyle: {
              fontWeight: "bold",
            },
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
