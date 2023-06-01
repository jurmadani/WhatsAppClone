import { firebase } from "../../backend/firebase";

export async function handleSignInWithPhoneNumber(phoneNumber: string, countryCode: string) {
    console.log(countryCode + phoneNumber)
    const task = await firebase.firestore().collection('Users').doc(countryCode + phoneNumber).get();
    console.log(task.exists)

}