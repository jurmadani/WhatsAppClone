import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { OptionRenderItemType } from "../../types/ChooseInfoScreenComponentsTypes/OptionRenderItemTypes";
import { Divider } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import { firebase } from "../../../backend/firebase";
import { userSliceType } from "../../types/redux/sliceTypes";

const OptionRenderItem = ({
  item,
  index,
  currentStatus,
}: OptionRenderItemType) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const handleOnPress = async (item: string) => {
    setLoading(true);
    //update current status
    dispatch(userSlice.actions.updateUserGlobalStateInfo({ info: item }));
    //set selected status activity indicator true till promise resolves
    try {
      await firebase
        .firestore()
        .collection("Users")
        .doc(user?.uniqueId)
        .update({
          info: item,
        });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("User info updated in firestore");
      setLoading(false);
    }
  };
  return (
    <TouchableOpacity
      onPress={async () => {
        await handleOnPress(item);
      }}
    >
      <Divider style={styles.divider} />
      <View style={styles.container}>
        <Text style={styles.item}>{item}</Text>
        {currentStatus === item && !loading && (
          <Ionicons
            name="checkmark"
            size={27}
            style={styles.icon}
            color="#3396FD"
          />
        )}
        {currentStatus === item && loading && (
          <ActivityIndicator style={styles.loading} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OptionRenderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 17,
  },
  divider: {
    marginLeft: 20,
    backgroundColor: "lightgray",
  },
  icon: {
    paddingRight: 10,
  },
  loading: {
    paddingRight: 10,
  },
});
