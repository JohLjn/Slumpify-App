import React from "react";
import { StyleSheet, View, Text, Modal, FlatList } from "react-native";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Meny({ openMeny, navigation }) {
  const [closeMeny, setCloseMeny] = useState(false);

  const links = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Home",
    },
    {
      id: "grehreh-c605-gerg-grreg-fgrr4564rggre",
      title: "Randomizer",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Saved Songs",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Contact",
    },
  ];

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openMeny !== closeMeny}
      >
        <View style={styles.modalContainer}>
          <FlatList
            style={styles.flatContainer}
            data={links}
            renderItem={({ item }) => (
              <View>
                <Text
                  onPress={() => {
                    navigation.navigate(item.title);
                    setCloseMeny(!closeMeny);
                  }}
                  style={styles.item}
                >
                  {item.title}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          ></FlatList>
          <View style={styles.closeContainer}>
            <Text
              onPress={() => setCloseMeny(!closeMeny)}
              style={styles.closeMenu}
            >
              Close
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

Meny.propTypes = {
  openMeny: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .85)",
    alignItems: "center",
  },
  item: {
    color: "white",
    padding: 10,
    fontWeight: 800,
    textAlign: "center",
    marginTop: 10,
  },
  flatContainer: {
    flex: 1,
    marginTop: 150,
  },
  closeContainer: {
    flex: 3,
    marginTop: 15,
  },
  closeMenu: {
    padding: 10,
    color: "rgb(23, 170, 23)",
    fontWeight: 800,
    textAlign: "center",
  },
});
