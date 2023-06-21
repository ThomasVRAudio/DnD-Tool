import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const EditTextPopup = ({ initText, onSubmitChanges }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(initText);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          onSubmitEditing={() => {
            //onSubmitChanges(text);
          }}
          onChangeText={(newText) => {
            setText(newText);
          }}
          defaultValue={text[0]}
        ></TextInput>
        <TextInput
          style={styles.desc}
          onSubmitEditing={() => onSubmitChanges(text)}
          onChangeText={(newText) => setText(newText)}
          defaultValue={text[1]}
        ></TextInput>
      </View>
      <Ionicons
        style={styles.submit}
        name="return-down-back-outline"
        size={20}
        borderWidth={1}
        onPress={() => onSubmitChanges(text)}
        onChangeText={setText}
      />
    </>
  );
};

export default EditTextPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    AlignItems: "flex-start",
    padding: 5,
    margin: 10,
    backgroundColor: "#E0C7A1",
    borderRadius: 8,
    elevation: 5,
    overflow: "visible",
    borderWidth: 0.5,
    borderColor: "#000000",
  },
  title: {
    color: Colors.textColor,
    fontSize: 25,
    textAlign: "left",
    fontFamily: "Serif-Light",
  },
  desc: {
    color: Colors.textColor,
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Serif-Light-Italic",
  },
  submit: {
    textAlign: "right",
    padding: 10,
  },
});
