import { StyleSheet, SafeAreaView, View } from "react-native";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar.jsx";
import SavedSongs from "../components/SavedSongs.jsx";

export default function SavedSongsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.introContainer}>
        <SavedSongs />
      </View>
    </SafeAreaView>
  );
}

SavedSongsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  introContainer: {
    flex: 1,
    marginTop: 40
  },
});
