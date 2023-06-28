import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import ContextStorage from "../ContextStorage.js";

export default function Pig() {
  const { PigAppear } = useContext(ContextStorage);
  const fadePig = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (PigAppear) {
      Animated.timing(fadePig, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadePig, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [PigAppear]);

  return (
    <View style={[styles.container, !PigAppear && styles.hidden]}>
      <Animated.View style={[styles.pigContainer, { opacity: fadePig }]}>
        <View style={styles.justifyPig}>
          <Text style={styles.pigText}>^.</Text>
          <Text style={styles.pigText}>.^</Text>
        </View>
        <Text style={styles.pigText}>( @ )</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  pigText: {
    color: "#f176eb",
    fontSize: 82,
  },
  pigContainer: {
    alignItems: "center",
  },
  justifyPig: {
    flexDirection: "row",
    gap: 90,
  },
});
