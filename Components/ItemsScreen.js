import { ScrollView, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";
import Item from "./Item";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import EditTextPopup from "./EditTextPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemsScreen = () => {
  const DATA = [
    {
      title: "",
      desc: "",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("itemList");

    if (jsonValue != null) {
      setItemList(JSON.parse(jsonValue));
    }
  };

  const [item, setItem] = useState(DATA);
  const [itemList, setItemList] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(1);

  const [inputTitleText, setInputTitleText] = useState();
  const [inputDescriptionText, setInputDescriptionText] = useState();

  const initialRender = useRef(true);

  const handleAddItem = () => {
    setItem({
      title: "",
      desc: "",
    });
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setItemList([...itemList, item]);
    }
  }, [item]);

  const pressItemHandler = (index) => {
    setModalIsVisible(true);
    setInputTitleText(itemList[index].title);
    setInputDescriptionText(itemList[index].desc);
    setEditIndex(index);
  };

  const onPressSaveEdit = () => {
    setModalIsVisible(false);
    let newItemList = [...itemList];
    newItemList[editIndex].title = inputTitleText;
    newItemList[editIndex].desc = inputDescriptionText;
    setItemList(newItemList);

    AsyncStorage.setItem("itemList", JSON.stringify(itemList));
  };

  return (
    <LinearGradient colors={Colors.parchmentGradient} style={styles.container}>
      <ScrollView>
        {itemList.map((item, index) => {
          return (
            <Item
              title={item.title}
              desc={item.desc}
              key={index}
              press={() => pressItemHandler(index)}
            />
          );
        })}
      </ScrollView>
      <Modal
        animationType="fade"
        visible={modalIsVisible}
        onRequestClose={() => setModalIsVisible(false)}
      >
        <EditTextPopup
          titleText={inputTitleText}
          setTitleText={setInputTitleText}
          descText={inputDescriptionText}
          setDescText={setInputDescriptionText}
          onPressSaveEdit={() => onPressSaveEdit()}
        />
      </Modal>
      <Ionicons
        name="add-circle"
        color="#745B5B"
        size={80}
        style={styles.createNewButton}
        onPress={() => {
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
