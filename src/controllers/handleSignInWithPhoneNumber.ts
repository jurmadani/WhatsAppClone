import { firebase } from "../../backend/firebase";
import { Alert } from "react-native";
import { userSlice } from "../redux/userSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export async function handleSignInWithPhoneNumber(phoneNumber: string,
    countryCode: string,
    country: string,
    navigation: NativeStackNavigationProp<StackNavigatorTypes>,
    dispatch: Dispatch<AnyAction>) {
    const getUID = require('uuid-by-string');
    const fullPhoneNumber = countryCode + phoneNumber
    try {
        const snapshot = await firebase
            .firestore()
            .collection("Users")
            .where("phoneNumber", "==", phoneNumber)
            .get();
        const documents = snapshot.docs.map((doc) => doc.data());
        if (documents.length > 0) {

            const userPayload = {
                uniqueId: documents[0].uniqueId,
                phoneNumber: documents[0].phoneNumber,
                countryCode: documents[0].countryCode,
                country: documents[0].country,
                status: documents[0].status,
                imageURL: documents[0].imageURL,
                contacts: documents[0].contacts,
                chatRooms: documents[0].chatRooms,
                fullName: documents[0].fullName,
                info: documents[0].info

            }
            dispatch(userSlice.actions.setUserGlobalState(userPayload))
            //navigate to app
            navigation.navigate('BottomTabNav')
            console.log('User added to firestore database')
        }
        else {
            Alert.alert("This phone number is not registered yet")
        }


    } catch (error) { console.log(error) }

}