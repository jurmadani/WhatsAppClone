import { View, Text, TouchableOpacity, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import BottomTabNavigator from "./BottomTabNavigator";
import ChatScreen from "../screens/ChatScreen";
import { Avatar, Divider } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContactsModal from "../screens/NewConversationModal";
import NewConversationModal from "../screens/NewConversationModal";
import { windowHeight } from "../constants/Dimensions";
import { SearchBar } from "@rneui/base";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator<StackNavigatorTypes>();

/*
        const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();

        ALL SCREENS IN ORDER:
        <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerTitle: "Phone Number",
          headerStyle: {
            backgroundColor: "whitesmoke",
          },
          headerRight: () => <Button title="Done" />,
        }}
      />
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
                    name="ios-chevron-back"
                    size={35}
                    color={"#3396FD"}
                    style={{ right: 10 }}
                  />
                </TouchableOpacity>
                <Avatar
                  source={{ uri: route.params?.item.user.image }}
                  style={{ height: 38, width: 38 }}
                />
                <View>
                  <Text
                    style={{ fontSize: 17, fontWeight: "600", paddingLeft: 10 }}
                  >
                    {route.params?.item.user.name}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 11.5,
                      color: "#8E8E93",
                    }}
                  >
                    tap here for contact info
                  </Text>
                </View>
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
      <Stack.Screen
        name="NewConversationModal"
        component={NewConversationModal}
        options={({ navigation, route }) => {
          return {
            presentation: "modal",
            header: () => (
              <View style={{ backgroundColor: "white", paddingTop: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
                  >
                    New conversation
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      left: windowHeight / 2.45,
                    }}
                  >
                    <Ionicons
                      name="close"
                      size={30}
                      color={"#B4B4B4"}
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: 15,
                        overflow: "hidden",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <SearchBar
                  //@ts-ignore
                  platform={Platform.OS === "ios" ? "ios" : "android"}
                  placeholder={"Search"}
                  showCancel={false}
                  inputContainerStyle={{
                    height: 10,
                    backgroundColor: "whitesmoke",
                  }}
                  containerStyle={{
                    marginTop: 5,
                    marginBottom: 15,
                    width: "96%",
                    alignSelf: "center",
                  }}
                />
                <Divider />
              </View>
            ),
          };
        }}
      />


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
                    name="ios-chevron-back"
                    size={35}
                    color={"#3396FD"}
                    style={{ right: 10 }}
                  />
                </TouchableOpacity>
                <Avatar
                  source={{ uri: route.params?.item.user.image }}
                  style={{ height: 38, width: 38 }}
                />
                <View>
                  <Text
                    style={{ fontSize: 17, fontWeight: "600", paddingLeft: 10 }}
                  >
                    {route.params?.item.user.name}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 11.5,
                      color: "#8E8E93",
                    }}
                  >
                    tap here for contact info
                  </Text>
                </View>
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
      <Stack.Screen
        name="NewConversationModal"
        component={NewConversationModal}
        options={({ navigation, route }) => {
          return {
            presentation: "modal",
            header: () => (
              <View style={{ backgroundColor: "white", paddingTop: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
                  >
                    New conversation
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      left: windowHeight / 2.45,
                    }}
                  >
                    <Ionicons
                      name="close"
                      size={30}
                      color={"#B4B4B4"}
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: 15,
                        overflow: "hidden",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <SearchBar
                  //@ts-ignore
                  platform={Platform.OS === "ios" ? "ios" : "android"}
                  placeholder={"Search"}
                  showCancel={false}
                  inputContainerStyle={{
                    height: 10,
                    backgroundColor: "whitesmoke",
                  }}
                  containerStyle={{
                    marginTop: 5,
                    marginBottom: 15,
                    width: "96%",
                    alignSelf: "center",
                  }}
                />
                <Divider />
              </View>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
