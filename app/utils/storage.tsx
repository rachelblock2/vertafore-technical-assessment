import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadTodos = async (setTodos: (todos: {id: number, title: string, completed: boolean}[]) => void, defaultData: any[]) => {
  try {
    const storedTodos = await AsyncStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos)); // Use stored todos
    } else {
      setTodos(defaultData.sort((a, b) => b.id - a.id)); // Use default data
    }
  } catch (error) {
    console.error("Error loading todos:", error);
  }
};

export const saveTodos = async (todos: {id: number, title: string, completed: boolean}[]) => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", jsonValue);
    } catch (error) {
      console.error("Error saving todos:", error);
    };
  };