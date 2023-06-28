import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import base64 from "react-native-base64";
import { clientId, clientSecret } from "../SuperSecret.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

export default function Randomizer() {
  const [savedToken, setSavedToken] = useState(null);
  const [fetchSong, setFetchSong] = useState(null);
  const [songName, setSongName] = useState(null);
  const [songDate, setSongDate] = useState(null);
  const [songArtist, setSongArtist] = useState(null);
  const [songImage, setsongImage] = useState(null);
  const [songLink, setsongLink] = useState(null);
  const [newCall, setNewCall] = useState(false);
  const [showAddedToFavourites, setShowAddedToFavourites] = useState(false);

  const containerOpacity = useRef(new Animated.Value(0)).current;

  const fadeInAnimation = () => {
    Animated.timing(containerOpacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const navigateToSong = () => {
    const url = songLink;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open link:", err)
    );
  };

  //Retrieve Token
  useEffect(() => {
    const retrieveAccessToken = async () => {
      const base64Credentials = base64.encode(`${clientId}:${clientSecret}`);

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: "grant_type=client_credentials",
        });

        const data = await response.json();
        setSavedToken(data.access_token);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveAccessToken();
  }, []);

  //GET a playlist
  useEffect(() => {
    if (newCall) {
      fetch("https://api.spotify.com/v1/playlists/37i9dQZF1EVHGWrwldPRtj", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + savedToken,
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          const totalItems = result.tracks.items.length;
          const randomIndex = Math.floor(Math.random() * totalItems);
          const randomTrackId = result.tracks.items[randomIndex].track.id;
          setFetchSong("https://api.spotify.com/v1/tracks/" + randomTrackId);
          setNewCall(false);
        })
        .catch((error) => console.log(error));
    }
  }, [newCall]);

  //Retrieve info from song
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch(fetchSong, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + savedToken,
          },
          method: "GET",
        });

        const result = await response.json();
        setSongName(result.name);
        setSongDate(result.album.release_date);
        setSongArtist(result.artists[0].name);
        setsongImage(result.album.images[0].url);
        setsongLink(result.uri);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrack();
  }, [fetchSong]);

  const addNewSong = () => {
    containerOpacity.setValue(0);
    fadeInAnimation();
    setNewCall(true);
  };

  const saveSong = async () => {
    const songData = {
      name: songName,
      date: songDate,
      artist: songArtist,
      image: songImage,
      link: songLink,
    };

    const savedSongsString = await AsyncStorage.getItem("@MyApp:savedSongs");
    const savedSongs = savedSongsString ? JSON.parse(savedSongsString) : [];

    savedSongs.push(songData);

    await AsyncStorage.setItem("@MyApp:savedSongs", JSON.stringify(savedSongs));

    setShowAddedToFavourites(true);
    setTimeout(() => {
      setShowAddedToFavourites(false);
    }, 1500);
  };

  return (
    <LinearGradient
      colors={["#000000", "#000000", "#242424"]}
      style={styles.container}
    >
      <View style={styles.container}>
        {showAddedToFavourites && (
          <Animatable.Text
            animation="fadeIn"
            duration={500}
            style={styles.addedToFavouritesText}
          >
            ❤
          </Animatable.Text>
        )}
        {songName ? (
          <Animated.View
            style={[
              styles.songContainer,
              styles.shadow,
              { opacity: containerOpacity, backgroundColor: "#000000" },
            ]}
          >
            {songImage !== "" && (
              <Image source={{ uri: songImage }} style={styles.image} />
            )}
            <Text style={styles.songHeader}>{songName}</Text>
            <Text style={styles.songInfoArtist}>{songArtist}</Text>
            <Text style={styles.songInfoDate}>{songDate}</Text>
            <TouchableOpacity onPress={navigateToSong}>
              <Text style={{ color: "#5691f8" }}>Open in Spotify App</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Text style={styles.textclr}>Loading...</Text>
        )}

        <View style={styles.btnContainer}>
          <TouchableHighlight style={styles.newSongBtn} onPress={addNewSong}>
            <Text style={styles.newSongBtnTitle}>New Song</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.SaveSongBtn} onPress={saveSong}>
            <Text style={styles.newSongBtnTitle}>Save Song</Text>
          </TouchableHighlight>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  songContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    paddingBottom: 25,
    borderRadius: 8,
  },

  shadow: {
    shadowColor: "white",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 92,
  },

  songHeader: {
    color: "white",
    fontWeight: 800,
    fontSize: 18,
  },

  songInfoArtist: {
    color: "#FFF",
    fontWeight: 600,
  },

  songInfoDate: {
    fontStyle: "italic",
    color: "#ebebeb",
    fontWeight: 400,
  },

  image: {
    width: 225,
    height: 225,
    marginBottom: 10,
  },

  addedToFavouritesText: {
    position: "absolute",
    zIndex: 5,
    top: 155,
    fontSize: 100,
    color: "#ffffff",
    marginTop: 10,
  },

  btnContainer: {
    marginTop: 30,
  },

  newSongBtn: {
    backgroundColor: "#149114",
    color: "white",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },

  SaveSongBtn: {
    backgroundColor: "#a739e7",
    color: "white",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },

  newSongBtnTitle: {
    fontWeight: 600,
    color: "#FFF",
  },
});
