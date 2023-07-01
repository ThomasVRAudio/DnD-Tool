import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

const Armor = ({ armor, index, onDelete }) => {
  const [tapOpen, setTapOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setTapOpen(!tapOpen)}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.title}>Category</Text>
          <Text style={styles.title}>Defense</Text>
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.input}>{armor.name}</Text>
          <Text style={styles.input}>{armor.armor_category}</Text>
          <Text style={styles.input}>
            {armor.armor_class_base && "+"}
            {armor.armor_class_base}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        {tapOpen && (
          <View style={styles.trashContainer}>
            <TouchableOpacity onPress={() => onDelete(index)}>
              <Ionicons
                name="trash-outline"
                size={20}
                style={styles.delete}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Armor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    alignSelf: "center",
    padding: 5,
    elevation: 5,
    margin: 5,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Serif-Bold",
    flex: 1,
    fontSize: 13,
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontFamily: "Serif-Light",
    fontSize: 15,
    textAlign: "left",
    flex: 1,
  },
  ability_modifier: {
    fontFamily: "Serif-Light-Italic",
  },
  drop_down: {
    backgroundColor: Colors.buttonTwo,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    height: "70%",
    elevation: 5,
  },
  drop_down_text: {
    fontFamily: "Serif-Light",
    paddingVertical: 0,
    fontSize: 14,
  },
  modifier_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  drop_down_open: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
  },
  delete: {
    textAlign: "right",
    paddingTop: 10,
  },
  trashContainer: {
    alignItems: "flex-end",
  },
});
