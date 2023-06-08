import { View, Text, TouchableOpacity, Button } from "react-native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
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
import { useState, useEffect } from "react";
import { handleSignInWithPhoneNumber } from "../controllers/handleSignInWithPhoneNumber";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import EditProfileScreen from "../screens/EditProfileScreen";
import ProfilePictureScreen from "../screens/ProfilePictureScreen";
import EditButton from "../components/ProfilePictureScreenComponents/EditButton";
import OkButton from "../components/EditProfileScreenComponents/OkButton";
import CloseKeyboardButton from "../components/EditProfileScreenComponents/CloseKeyboardButton";
import ChooseInfoScreen from "../screens/ChooseInfoScreen";
import AddNewContactModal from "../screens/AddNewContactModal";
import SaveButton from "../components/AddNewContactModalComponents/SaveButton";
import CancelButton from "../components/AddNewContactModalComponents/CancelButton";
import CountriesModalHeader from "../components/CountriesModalComponents/CountriesModalHeader";
import CountriesModal from "../screens/CountriesModal";
import ImageCache from "../controllers/ImageCache";
import ContactDetailsScreen from "../screens/ContactDetailsScreen";
import HeaderLeftAccessory from "../components/ContactDetailsScreenComponents/HeaderLeftAccessory";
import ContactProfilePictureScreen from "../screens/ContactProfilePictureScreen";

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
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ route }) => {
          return {
            headerTitle: "Phone Number",
            headerStyle: {
              backgroundColor: "whitesmoke",
            },
            headerRight: () => (
              <Button
                title="Done"
                onPress={async () => {
                  await handleSignInWithPhoneNumber(
                    route.params?.phoneNumber,
                    route.params?.countryCode,
                    route.params?.countryName,
                    navigation,
                    dispatch
                  );
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => {
          return {
            headerStyle: {
              backgroundColor: "whitesmoke",
            },
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="ios-chevron-back"
                    size={35}
                    color={"#3396FD"}
                    style={{ right: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ContactProfilePicture", {
                      contactImageURL: route?.params?.imageURL,
                    })
                  }
                >
                  <ImageCache
                    uri={route?.params?.imageURL}
                    height={38}
                    width={38}
                    borderRadius={99}
                    imageType={
                      route?.params?.firstName +
                      route?.params?.lastName +
                      " image from chat screen"
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ContactDetails", {
                      contact: route?.params,
                    });
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "600",
                        paddingLeft: 10,
                      }}
                    >
                      {route?.params?.firstName} {route?.params?.lastName}
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
                </TouchableOpacity>
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
            header: () => {
              const [searchInput, setSearchInput] = useState("");
              useEffect(() => {
                navigation.setParams({ searchInput });
              }, [searchInput]);
              return (
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
                    value={searchInput}
                    onChangeText={(text) => setSearchInput(text)}
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
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const offsetPassedLimit = offsetY > 15;
          return {
            headerStyle: {
              backgroundColor: offsetPassedLimit ? "whitesmoke" : "white",
            },
            headerShadowVisible: offsetPassedLimit ? true : false,

            headerTitle: "Edit profile",
            headerTitleStyle: {
              fontWeight: "600",
            },
            headerRight: () => {
              if (route?.params?.isKeyboardOpen === true)
                return <OkButton fullName={route?.params?.fullName} />;
            },
            headerLeft: () => {
              if (route?.params?.isKeyboardOpen === true)
                return <CloseKeyboardButton />;
            },
          };
        }}
      />
      <Stack.Screen
        name="ProfilePicture"
        component={ProfilePictureScreen}
        options={({ route }) => {
          return {
            headerRight: () => <EditButton />,
            headerTitle: "Profile picture",
          };
        }}
      />
      <Stack.Screen
        name="ChooseInfo"
        component={ChooseInfoScreen}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const offsetPassedLimit = offsetY > 1;
          return {
            headerTitle: "Info",
            headerStyle: {
              backgroundColor: offsetPassedLimit ? "white" : "whitesmoke",
            },
            headerShadowVisible: offsetPassedLimit ? true : false,
          };
        }}
      />
      <Stack.Screen
        name="AddNewContactModal"
        component={AddNewContactModal}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const offsetPassedLimit = offsetY > 1;
          return {
            headerTitle: "New contact",
            headerStyle: {
              backgroundColor: offsetPassedLimit ? "white" : "whitesmoke",
            },
            headerShadowVisible: offsetPassedLimit ? true : false,
            presentation: "modal",
            headerRight: () => (
              <SaveButton
                contanctCanBeSaved={route?.params?.contanctCanBeSaved}
                firstName={route?.params?.firstName}
                lastName={route?.params?.lastName}
                country={route?.params?.country}
                countryCode={route?.params?.countryCode}
                phoneNumber={route?.params?.phoneNumber}
              />
            ),
            headerLeft: () => <CancelButton />,
          };
        }}
      />
      <Stack.Screen
        name="CountriesModal"
        component={CountriesModal}
        options={({ route }) => {
          return {
            header: () => (
              <CountriesModalHeader
                searchInput={route?.params?.searchInput}
                setSearchInput={route?.params?.setSearchInput}
              />
            ),
            presentation: "modal",
          };
        }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={({ route }) => {
          const offsetY = route?.params?.offsetY || 0;
          const showTitle = offsetY > 56;
          return {
            headerShadowVisible: showTitle ? true : false,
            headerStyle: {
              backgroundColor: showTitle ? "white" : "whitesmoke",
            },
            headerTitle: "Contact details",
            headerRight: () => <HeaderLeftAccessory />,
          };
        }}
      />
      <Stack.Screen
        name="ContactProfilePicture"
        component={ContactProfilePictureScreen}
        options={{
          headerTitle: "Contact picture",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
