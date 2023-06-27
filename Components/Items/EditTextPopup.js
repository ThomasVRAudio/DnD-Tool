import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

const EditTextPopup = ({
  onPressSaveEdit,
  onPressDelete,
  titleText,
  setTitleText,
  descText,
  setDescText,
}) => {
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          onChangeText={(text) => setTitleText(text)}
          placeholder="Title"
          defaultValue={titleText}
          editable={true}
          multiline={true}
        ></TextInput>
        <TextInput
          style={styles.desc}
          onChangeText={(text) => setDescText(text)}
          defaultValue={descText}
          editable={true}
          multiline={true}
          placeholder="Description"
        ></TextInput>
      </View>
      <View style={styles.buttonsContainer}>
        <Ionicons
          style={styles.button}
          name="trash"
          size={60}
          onPress={() => onPressDelete()}
        />
        <Ionicons
          style={styles.button}
          name="checkmark"
          size={60}
          onPress={() => onPressSaveEdit()}
        />
      </View>
    </>
  );
};

export default EditTextPopup;

const styles = StyleSheet.create({
  container: {
    flex: 5,
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
  button: {
    margin: 20,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
});
