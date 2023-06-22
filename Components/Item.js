import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

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
    backgroundColor: Colors.card,
    borderRadius: 8,
    elevation: 5,
    overflow: "visible",
    borderWidth: 0.5,
    borderColor: Colors.text,
  },
  title: {
    color: Colors.text,
    fontSize: 25,
    textAlign: "left",
    fontFamily: "Serif-Light",
  },
  desc: {
    color: Colors.text,
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Serif-Light-Italic",
  },
});
