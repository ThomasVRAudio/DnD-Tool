import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const SearchItem = ({ item, select }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => select(item.index)}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    padding: 10,
    elevation: 5,
  },
  text: {
    fontFamily: "Serif-Light",
    fontSize: 15
  }
})