import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Modal } from "@ui-kitten/components";
import { ActivityIndicator } from "react-native-paper";
import { ModalType } from "../../types/ProfilePictureScreenTypes/ChangingPictureModalTypes";

const ChangingPictureModal = ({ modalLoading }: ModalType) => {
  return (
    <View>
      <Modal
        visible={modalLoading}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <View style={styles.card}>
          <Text>Updating your profile picture...</Text>
          <ActivityIndicator
            style={styles.activityIndicator}
            color="royalblue"
            size={22}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ChangingPictureModal;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    marginLeft: 15,
  },
});
