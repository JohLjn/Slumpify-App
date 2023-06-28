import React from "react";
import { ActionSheetIOS, Button, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";

export default function SavedSongsScreen({ setResetList }) {
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Reset"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          AsyncStorage.clear().then(() => {
            setResetList(true);
          });
        }
      }
    );

  return (
    <View style={styles.container}>
      <Button onPress={onPress} title="Reset List" color="red" />
    </View>
  );
}

SavedSongsScreen.propTypes = {
  setResetList: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  result: {
    fontSize: 64,
    textAlign: "center",
    color: "#FFF",
  },
});
