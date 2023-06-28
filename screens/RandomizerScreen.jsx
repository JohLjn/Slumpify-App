import { StyleSheet, SafeAreaView, View } from "react-native";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar.jsx";
import Randomizer from "../components/Randomizer.jsx";

export default function RandomizerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.introContainer}>
        <Randomizer />
      </View>
    </SafeAreaView>
  );
}

RandomizerScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    
  },

  introContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
