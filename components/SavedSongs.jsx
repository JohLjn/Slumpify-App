import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResetSavedSongs from "./ResetSavedSongs.jsx";
import { LinearGradient } from "expo-linear-gradient";

export default function SavedSongsScreen() {
  const [savedSongs, setSavedSongs] = useState([]);
  const [resetList, setResetList] = useState(false);

  useEffect(() => {
    const retrieveSavedSongs = async () => {
      try {
        const savedSongsString = await AsyncStorage.getItem(
          "@MyApp:savedSongs"
        );
        const savedSongsData = savedSongsString
          ? JSON.parse(savedSongsString)
          : [];
        setSavedSongs(savedSongsData);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveSavedSongs();
  }, [resetList]);

  const navigateToSong = (songLink) => {
    Linking.openURL(songLink).catch((err) =>
      console.error("Failed to open link:", err)
    );
  };

  return (
    <LinearGradient
      colors={["#000000", "#0e630e", "#000000"]}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Saved Songs:</Text>
        {savedSongs.map((song, index) => (
          <View style={styles.songContainer} key={index}>
            <Image source={{ uri: song.image }} style={styles.image} />
            <View style={styles.songInfoContainer}>
              <Text style={styles.songHeader}>{song.name}</Text>
              <Text style={styles.songText}>{song.artist}</Text>
              <TouchableOpacity onPress={() => navigateToSong(song.link)}>
                <Text style={{ color: "#5691f8" }}>Open in Spotify App</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {savedSongs.length > 0 && (
          <ResetSavedSongs setResetList={setResetList} />
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 45,
  },

  songContainer: {
    flexDirection: "row",
    marginBottom: 25,
    marginLeft: 15,
  },

  songInfoContainer: {
    gap: 25,
    marginLeft: 15,
  },

  songHeader: {
    fontWeight: 800,
    color: "#FFF",
  },

  songText: {
    color: "#FFF",
    fontSize: 13,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
