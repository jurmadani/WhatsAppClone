import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActionSheetIOS,
  Image,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { InputBoxTypes } from "../../types/ChatScreenComponentsTypes/InputBoxType";
import { firebase } from "../../../backend/firebase";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const InputBox = ({
  usersDidChatBefore,
  otherUserUniqueId,
  setDidUsersChatBefore,
  chatRoom,
  setChatRoomId,
  messagesArray,
}: InputBoxTypes) => {
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const handleSendMessage = async () => {
    if (usersDidChatBefore === false) {
      //create a new chat room doc in firestore
      try {
        //get ref to collection
        const chatRoomsCollection = firebase
          .firestore()
          .collection("ChatRooms");
        //add new doc
        var chatRoomDocumentObject = {
          chatRoomId: "",
          messages: [
            {
              text: message,
              createdAt: new Date(),
              chatRoomId: "",
              senderUniqueId: user.uniqueId,
            },
          ],
          users: [user.uniqueId, otherUserUniqueId],
          lastMessage: message,
        };
        const docRef = await chatRoomsCollection.add(chatRoomDocumentObject); // Create a new document with an auto-generated ID
        const chatRoomId = docRef.id; // Get the generated ID
        //mutate the object
        chatRoomDocumentObject.chatRoomId = chatRoomId;
        // Update the newly created document with the generated ID
        await docRef.update({
          chatRoomId,
          messages: [
            {
              text: message,
              createdAt: new Date(),
              chatRoomId: chatRoomId,
              senderUniqueId: user.uniqueId,
            },
          ],
        });

        //update both users chatRooms arrays

        //user that is logged in
        await firebase
          .firestore()
          .collection("Users")
          .doc(user?.uniqueId)
          .update({
            chatRooms: [...user?.chatRooms, chatRoomId],
          });
        //other user in chatroom
        await firebase
          .firestore()
          .collection("Users")
          .doc(otherUserUniqueId) // Replace with the document ID of the other user
          .update({
            chatRooms: firebase.firestore.FieldValue.arrayUnion(chatRoomId),
          });

        dispatch(
          userSlice.actions.updateUserGlobalStateChatRoomsArray({
            chatRoomObject: [...user.chatRooms, chatRoomId],
          })
        );
        setDidUsersChatBefore(true);
        setChatRoomId(docRef.id);
        console.log("Created new chat room document in firestore");
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    } else if (chatRoom != undefined && usersDidChatBefore === true) {
      //add to the existing chat room
      await firebase
        .firestore()
        .collection("ChatRooms")
        .doc(chatRoom.chatRoomId)
        .update({
          messages: [
            ...messagesArray,
            {
              chatRoomId: chatRoom.chatRoomId,
              createdAt: new Date(),
              text: message,
              senderUniqueId: user.uniqueId,
            },
          ],
          lastMessage: message,
        });
      setMessage("");
    }
  };

  const sendPhotoTakenFromCamera = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");
    if (cameraStatus)
      navigation.navigate("TakePhotoChatScreen", {
        receiverUniqueId: otherUserUniqueId,
        usersDidChatBefore,
        setDidUsersChatBefore,
        chatRoom,
        setChatRoomId,
        messagesArray,
      });
  };

  const sendPhotoFromMediaLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //navigate back
      navigation.navigate("TakePhotoChatScreen", {
        receiverUniqueId: otherUserUniqueId,
        image: result.assets[0].uri,
        usersDidChatBefore,
        setDidUsersChatBefore,
        chatRoom,
        setChatRoomId,
        messagesArray,
      });
    }
  };
  const chooseMediaTypeActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Photo camera", "Media library"],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          //cancel: do nothing
        } else if (buttonIndex === 1) {
          await sendPhotoTakenFromCamera();
        } else if (buttonIndex === 2) {
          await sendPhotoFromMediaLibrary();
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Icon */}
      <TouchableOpacity onPress={() => chooseMediaTypeActionSheet()}>
        <AntDesign name="plus" size={27} color={"#007AFF"} />
      </TouchableOpacity>

      {/* Text input */}
      <TextInput
        placeholder="type your message..."
        style={styles.input}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      {/* Icon */}
      <TouchableOpacity
        onPress={handleSendMessage}
        disabled={message === "" ? true : false}
      >
        <MaterialIcons
          style={[
            styles.send,
            { backgroundColor: message === "" ? "#92C2F5" : "#007AFF" },
          ]}
          name="send"
          color={"white"}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "whitesmoke",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: "lightgray",
    borderWidth: 0.8,
    marginHorizontal: 10,
    fontSize: 15,
  },
  send: {
    padding: 7,
    borderRadius: 17,
    overflow: "hidden",
    alignSelf: "center",
  },
});
