import { StyleSheet, SafeAreaView, View } from "react-native";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar.jsx";
import Contact from "../components/Contact.jsx";

export default function ContactScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.introContainer}>
        <Contact />
      </View>
    </SafeAreaView>
  );
}

ContactScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  introContainer: {
    flex: 1,
    marginTop: 40,
  },
});
