import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { data } from "@/data/todos";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadTodos, saveTodos } from "./utils/storage";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function todoList() {
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [text, setText] = useState("");
  const [buttonText, setButtonText] = useState("Add Item");

  useEffect(() => {
    loadTodos(setTodos, data);
  }, []);  

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const goToHome = () => {
    router.push(`/`);
  };

  const addTodo = () => {
    if (text.trim()) {
      // Todos are reversed for UI, so selection of first instead of last
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
      setButtonText("Add Item")
    };
  };

  const editTodo = (id: number) => {
    let toBeEdited = todos.find(todo => todo.id === id);
    if (toBeEdited) {
        setText(toBeEdited.title);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        setButtonText('Edit Item')
    } else {
        return;
    };
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleCheckbox = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome} style={styles.button}>
        <Text style={styles.buttonText}>Return Home</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(newText) => setText(newText)}
          placeholder="Note to self..."
        />
        <TouchableOpacity onPress={addTodo} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.checkboxText}>
              <Checkbox
                status={item.completed ? "checked" : "unchecked"}
                onPress={() => toggleCheckbox(item.id)}
                color="#c5974b"
                uncheckedColor="gray"
              />
              <Text
                style={[
                  styles.todo,
                  item.completed ? styles.strikethrough : "",
                ]}
              >
                {item.title}
              </Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editTodo(item.id)}>
                <FontAwesome name="edit" size={25} color="rgb(197, 151, 75)" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <FontAwesome name="trash" size={25} color="rgb(197, 151, 75)" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexWrap: "wrap",
    backgroundColor: "#95D1BE",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todo: {
    color: "rgba(0, 0, 0, 0.7)",
  },
  checkboxText: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "12%",
  },
  input: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 6,
    borderWidth: 2,
    borderColor: "rgb(197 151 75)",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "rgba(0, 0, 0, 0.7)",
    width: "75%",
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
  inputContainer: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "rgb(197 151 75)",
    backgroundColor: "#dea954",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  buttonText: {
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: "bold",
  },
});
