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
        const userDoc = await firebase.firestore().collection('Users').doc(fullPhoneNumber).get();

        if (userDoc.exists === false) {
            const userPayload = {
                uniqueId: getUID(fullPhoneNumber),
                phoneNumber: phoneNumber,
                countryCode: countryCode,
                country: country,
                status: '',
                imageURL: "https://firebasestorage.googleapis.com/v0/b/rn-whatsapp-clone-8c38a.appspot.com/o/DefaultAvatar.png?alt=media&token=562af373-777d-4a90-8a92-bfc16eeb9209&_gl=1*zp3rnd*_ga*Mjg3OTM0MDA0LjE2NzY0NTA5ODg.*_ga_CW55HF8NVT*MTY4NTY0NDU3OS40OS4xLjE2ODU2NDk0MTYuMC4wLjA.",
                contacts: [],
                fullName: 'Full Name'
            }
            //create user doc in db
            try {
                await firebase.firestore().collection('Users').doc(userPayload.uniqueId).set(userPayload).then(() => {
                    //update redux state
                    dispatch(userSlice.actions.setUserGlobalState(userPayload))
                    //navigate to app
                    navigation.navigate('BottomTabNav')
                    console.log('User added to firestore database')
                })
            } catch (error) { console.log(error) }


        } else {
            Alert.alert('Phone number already registered on Whatsapp-Clone')
        }

    } catch (error) { console.log(error) }


}