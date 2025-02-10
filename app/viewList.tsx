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
import AsyncStorage from "@react-native-async-storage/async-storage";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function todoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos)); // Use stored todos if stored
        } else {
          setTodos(data.sort((a, b) => b.id - a.id)); // Use app created data if no stored data
        }
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const goToHome = () => {
    router.push(`/`);
  };

  const toggleCheckbox = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          return updatedTodo;
        } else {
          return todo;
        }
      })
    );
  };

  const saveTodos = async () => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", jsonValue);
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome} style={styles.button}>
        <Text style={styles.buttonText}>Return Home</Text>
      </TouchableOpacity>
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
  strikethrough: {
    textDecorationLine: "line-through",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
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
