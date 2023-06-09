import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Card, Modal } from "@ui-kitten/components";
import { ModalType } from "../../types/ProfilePictureScreenTypes/ChangingPictureModalTypes";

const DeletingContactModal = ({ modalLoading }: ModalType) => {
  return (
    <View>
      <Modal
        visible={modalLoading}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <View style={styles.card}>
          <Text>Deleting contact...</Text>
          <ActivityIndicator style={styles.activityIndicator} size={22} />
        </View>
      </Modal>
    </View>
  );
};

export default DeletingContactModal;

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
