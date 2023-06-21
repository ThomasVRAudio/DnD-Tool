import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import TouchableHighlight from "react-native-gesture-handler";

const Item = ({ desc, title, press }) => {
  return (
    <View style={styles.container} onStartShouldSetResponder={press}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
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
});
