import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";
import Item from "./Item";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import EditTextPopup from "./EditTextPopup";
import SearchScreen from "./SearchScreen";

const ItemsScreen = () => {
  const [item, setItem] = useState([]);
  const [dataItems, setDataItems] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState([]);
  const [editIndex, setEditIndex] = useState();

  const handleAddItem = () => {
    setDataItems([...dataItems, item]);
  };

  const editItem = (text) => {
    setIsEditing(false);
    let copyItems = [...dataItems];
    copyItems[editIndex] = text;
    console.log(copyItems[editIndex][0]);
    setDataItems(copyItems);
  };

  const pressHandler = (index) => {
    setEdit(dataItems[index]);
    setEditIndex(index);
    setIsEditing(true);
  };

  return (
    <LinearGradient colors={Colors.parchmentGradient} style={styles.container}>
      {isEditing ? (
        <EditTextPopup initText={edit} onSubmitChanges={editItem} />
      ) : (
        <ScrollView>
          {dataItems.map((item, index) => {
            return (
              <Item
                title={item[0]}
                desc={item[1]}
                key={index}
                press={() => pressHandler(index)}
              />
            );
          })}
        </ScrollView>
      )}

      <Ionicons
        name="add-circle"
        color="#745B5B"
        size={80}
        style={styles.createNewButton}
        onPress={() => {
          setItem([
            "Badass pick of destiny",
            "Makes you riff like crazy on any acoustic guitar",
          ]);
          handleAddItem();
        }}
      />
    </LinearGradient>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    AlignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  createNewButton: {
    textAlign: "right",
  },
});
