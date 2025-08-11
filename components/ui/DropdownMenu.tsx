import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {isOpen ? "Close Menu" : "Open Menu"}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isOpen}
        onBackdropPress={() => setIsOpen(false)}
        backdropOpacity={0} // fully transparent background
        animationIn="slideInDown"
        animationOut="slideOutUp"
        style={styles.modal}
      >
        <View style={styles.dropdown}>
          <TouchableOpacity>
            <Text style={styles.item}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.item}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.item}>Option 3</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    margin: 0, // so it can be positioned anywhere
    justifyContent: "flex-start", // top positioning
    paddingTop: 70, // space from top (adjust to match button position)
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
