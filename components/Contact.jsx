import React from "react";
import { StyleSheet, SafeAreaView, Linking, Text, View } from "react-native";
import { Icon, SocialIcon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

export default function Contact() {
  const openLinkedInProfile = () => {
    const linkedinURL = "linkedin://profile/johan-leijon-704932249";
    Linking.openURL(linkedinURL).catch((err) =>
      console.error("Failed to open link:", err)
    );
  };

  const openGithubProfile = () => {
    const linkedinURL = "https://github.com/JohLjn";
    Linking.openURL(linkedinURL).catch((err) =>
      console.error("Failed to open link:", err)
    );
  };

  const openEmail = () => {
    const email = "johanleijon.96@gmail.com";
    const subject = "";
    const body = "";

    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoURL);
  };

  return (
    <LinearGradient
      colors={["#000000", "#3b5998", "#000000"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Get in contact</Text>
        <View style={styles.iconsContainer}>
          <Icon
            name="email"
            type="material"
            iconStyle={styles.emailIcon}
            onPress={openEmail}
          />
          <View style={styles.contactIconContainer}>
            <SocialIcon
              iconStyle={styles.githubIcon}
              type="github"
              onPress={openGithubProfile}
            />
            <SocialIcon type="linkedin" onPress={openLinkedInProfile} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    gap: 50,
  },

  header: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: 600,
  },

  iconsContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 50,
  },

  contactIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  emailIcon: {
    color: "#FFFFFF",
    fontSize: 76,
  },

  githubIcon: {
    fontSize: 58,
    height: 80,
    marginTop: 12,
  },
});
