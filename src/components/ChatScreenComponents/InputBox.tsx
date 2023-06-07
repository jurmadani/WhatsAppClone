import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { InputBoxTypes } from "../../types/ChatScreenComponentsTypes/InputBoxType";
import { firebase } from "../../../backend/firebase";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";

const InputBox = ({
  usersDidChatBefore,
  otherUserUniqueId,
  setDidUsersChatBefore,
  chatRoom,
  setChatRoomId,
  messagesArray,
}: InputBoxTypes) => {
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  /*
    if user chatted before is false => then first message will create a new doc in firestore
    then we need to update redux
  */
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
  return (
    <View style={styles.container}>
      {/* Icon */}
      <AntDesign name="plus" size={27} color={"#007AFF"} />
      {/* Text input */}
      <TextInput
        placeholder="type your message..."
        style={styles.input}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      {/* Icon */}
      <TouchableOpacity onPress={handleSendMessage}>
        <MaterialIcons
          style={styles.send}
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
    backgroundColor: "#007AFF",
    padding: 7,
    borderRadius: 17,
    overflow: "hidden",
    alignSelf: "center",
  },
});
