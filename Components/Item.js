import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const Item = ({ desc, title, press }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={press}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    AlignItems: "flex-start",
    padding: 5,
    margin:5,
    backgroundColor: Colors.card,
    borderRadius: 8,
    elevation: 5,
    overflow: "visible",
    borderWidth: 2,
    borderColor: Colors.text,
  },
  title: {
    color: Colors.text,
    fontSize: 20,
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
