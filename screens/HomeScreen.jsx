import { StyleSheet, Text, View, SafeAreaView, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import bgImage from "../assets/slumpify-logo.jpg";
import Navbar from "../components/Navbar.jsx";
import InfoBtn from "../components/InfoBtn.jsx";
import RandomizeBtn from "../components/RandomizeBtn.jsx";
import Pig from "../components/Pig.jsx";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  const scaleBg = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleBg, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleBg, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#000000", "#000000", "#0a470a"]}
        style={styles.container}
      >
        <Navbar navigation={navigation} />
        <View style={styles.introContainer}>
          <View style={styles.introTextContainer}>
            <Text style={styles.header}>Slumpify</Text>
            <Text style={styles.introText}>
              When you have simply cycled through all of Spotify.
            </Text>
          </View>
          <Animated.Image
            style={[styles.bgimage, { transform: [{ scale: scaleBg }] }]}
            source={bgImage}
          />
        </View>
        <InfoBtn />
        <RandomizeBtn navigation={navigation} />
        <Pig />
      </LinearGradient>
    </SafeAreaView>
  );
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
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

  introContainer: {
    marginTop: 80,
    paddingBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(23, 170, 23)",
    borderStyle: "solid",
  },

  introTextContainer: {
    width: "55%",
  },

  header: {
    color: "rgb(23, 170, 23)",
    fontFamily: "Gill Sans",
    fontSize: 52,
  },

  introText: {
    color: "#FFF",
    fontFamily: "Gill Sans",
    fontSize: 22,
    marginTop: 5,
  },

  bgimage: {
    width: 125,
    height: 225,
    marginLeft: 20,
  },
});
