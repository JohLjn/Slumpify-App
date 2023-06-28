import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useState, useContext } from "react";
import ContextStorage from "../ContextStorage.js";
import spotifyLogo from "../assets/spotify-logo-black.png";
import Meny from "../components/Meny.jsx";
import PropTypes from "prop-types";

export default function Navbar({ navigation }) {
  const [openMeny, setOpenMeny] = useState(false);

  const { PigAppear, setPigAppear } = useContext(ContextStorage);
  const toggleSwitch = () => setPigAppear((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        style={styles.switchPig}
        trackColor={{ false: "#767577", true: "rgb(71, 184, 71))" }}
        thumbColor={PigAppear ? "#fafafa" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={PigAppear}
      />
      <View style={styles.logoContainer}>
        <Image style={styles.logoImage} source={spotifyLogo} />
      </View>
      <TouchableOpacity
        style={styles.hamburgerContainer}
        onPress={() => setOpenMeny(!openMeny)}
      >
        <Text style={styles.hamburgerSpanOne}>-</Text>
        <Text style={styles.hamburgerSpanTwo}>-</Text>
        <Text style={styles.hamburgerSpanThree}>-</Text>
      </TouchableOpacity>
      {<Meny openMeny={openMeny} navigation={navigation} />}
    </View>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoImage: {
    width: 32,
    height: 32,
  },

  hamburgerContainer: {
    gap: 3,
    padding: 5,
  },

  hamburgerSpanOne: {
    width: 20,
    height: 2,
    backgroundColor: "#FFF",
  },

  hamburgerSpanTwo: {
    width: 20,
    height: 2,
    backgroundColor: "#FFF",
  },

  hamburgerSpanThree: {
    width: 20,
    height: 2,
    backgroundColor: "#FFF",
  },
});
