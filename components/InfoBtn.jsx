import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function InfoBtn() {
  const [showText, setShowText] = useState(false);
  const fadeIn = useState(new Animated.Value(0))[0];
  const slideIn = useState(new Animated.Value(-25))[0];

  useEffect(() => {
    if (showText) {
      Animated.parallel([
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideIn, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeIn, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideIn, {
          toValue: -25,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showText, fadeIn, slideIn]);

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => setShowText(!showText)}>
        <View style={styles.button}>
          <Text style={styles.btnText}>How does it work?</Text>
        </View>
      </TouchableHighlight>

      {showText && (
        <Animated.View
          style={[{ opacity: fadeIn, transform: [{ translateY: slideIn }] }]}
        >
          <Text style={styles.helloText}>
            Slumpify is an application that utilizes Spotifys API to provide a
            random song playback. The application allows users to discover and
            listen to various music tracks from Spotifys extensive song library.
            Slumpify is perfect for music lovers who want simple and convenient
            ways to explore new music and play songs randomly through the
            original Spotify application.
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    width: "85%",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#a739e7",
    alignItems: "center",
    padding: 10,
    width: 200,
    borderRadius: 10,
  },

  btnText: {
    color: "white",
  },

  helloText: {
    color: "white",
    marginTop: 10,
    fontSize: 18,
  },
});
