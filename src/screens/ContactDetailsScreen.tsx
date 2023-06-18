import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import ImageCache from "../controllers/ImageCache";
import { IContact } from "../types/ContactDetailsScreenComponentTypes/ContactDetailsScreenTypes";
import { firebase } from "../../backend/firebase";
import ActionButton from "../components/ContactDetailsScreenComponents/ActionButton";
import StatusCard from "../components/ContactDetailsScreenComponents/StatusCard";
import MediaButton from "../components/ContactDetailsScreenComponents/MediaButton";
import ContactActions from "../components/ContactDetailsScreenComponents/ContactActions";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import { userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";

const ContactDetailsScreen = ({ navigation, route }: any) => {
  const navigationHook =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const [contact, setContact] = useState<IContact>(route?.params?.contact);
  const scrollViewRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };
  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    return phoneNumber?.replace(/(\d{3})(?=\d)/g, "$1 ");
  };

  const buttons = [
    {
      title: "audio",
      icon: "call",
    },
    {
      title: "video",
      icon: "videocam",
    },
    {
      title: "search",
      icon: "search-outline",
    },
  ];

  const actions = ["Empty conversation", "Block", "Report"];

  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
    const fetchContactPhoneNumber = async () => {
      const snapshot = await firebase
        .firestore()
        .collection("Users")
        .where("uniqueId", "==", contact.otherUserUniqueId)
        .get();
      const data = snapshot.docs.map((doc) => doc.data());
      if (data?.length > 0) {
        const currentContactInformation = user.contacts.filter(
          (contactObj) => contactObj.uniqueId === contact.otherUserUniqueId
        );
        setContact({
          ...contact,
          phoneNumber: data[0]?.phoneNumber,
          country: data[0]?.country,
          countryCode: data[0]?.countryCode,
          info: data[0]?.info,
          firstName: currentContactInformation[0]?.firstName,
          lastName: currentContactInformation[0]?.lastName,
        });
      }
    };
    fetchContactPhoneNumber();
  }, [offsetY, user?.contacts]);

  useEffect(() => {
    navigation.setParams({ contact });
  }, [contact]);

  return (
    <ScrollView
      style={styles.screenContainer}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={24}
    >
      {/* Contact image */}

      <View style={styles.image}>
        <TouchableOpacity
          onPress={() =>
            navigationHook.navigate("ContactProfilePicture", {
              contactImageURL: contact.imageURL,
            })
          }
        >
          <ImageCache
            uri={contact.imageURL}
            borderRadius={99}
            height={115}
            width={115}
            imageType="Contact profile picture from contact details screen "
          />
        </TouchableOpacity>
      </View>

      {/* Contact name */}
      <Text style={styles.contactName}>
        {contact.firstName} {contact.lastName}
      </Text>
      {/* Contact phone number */}
      <Text style={styles.phoneNumber}>
        {contact.countryCode} {formatPhoneNumber(contact.phoneNumber)}
      </Text>
      {/* Buttons view */}
      <View style={styles.buttonsView}>
        {buttons.map((button, index) => (
          <ActionButton title={button.title} icon={button.icon} index={index} />
        ))}
      </View>
      {/* Status */}
      <StatusCard info={contact.info} />
      {/* List of buttons */}
      <MediaButton mediaArray={route?.params?.contact?.mediaArray}/>
      {/* List of actions */}
      <View style={styles.listOfActionsView}>
        {actions.map((action, index) => (
          <ContactActions title={action} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ContactDetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "whitesmoke",
    flex: 1,
  },
  image: {
    alignItems: "center",
    paddingTop: 20,
  },
  contactName: {
    alignSelf: "center",
    paddingTop: 10,
    fontSize: 33,
    fontWeight: "700",
  },
  phoneNumber: {
    alignSelf: "center",
    fontSize: 18,
    paddingTop: 2,
    opacity: 0.4,
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  listOfActionsView: {
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
});
