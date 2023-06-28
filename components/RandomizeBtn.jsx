import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";

export default function RandomizeBtn({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navigation.navigate("Randomizer")}>
        <View style={styles.button}>
          <Text style={styles.btnText}>Randomize a song!</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

RandomizeBtn.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  button: {
    backgroundColor: "rgb(20, 145, 20)",
    alignItems: "center",
    padding: 10,
    width: 200,
    borderRadius: 10,
  },

  btnText: {
    color: "white",
  },
});
