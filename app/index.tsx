import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Pacifico': require('@/assets/fonts/Pacifico-Regular.ttf'),
  });

  const viewList = () => {
    router.push(`/viewList`);
  };

  const editList = () => {
    router.push('/editList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Dos</Text>
      <TouchableOpacity onPress={viewList} style={styles.button}>
        <Text style={styles.buttonText}>View List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={editList} style={styles.button}>
        <Text style={styles.buttonText}>Edit List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#95D1BE",
  },
  title: {
    fontFamily: "Pacifico, serif",
    fontSize: 70,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -4, height: 4 },
    textShadowRadius: 0,
    height: "50%",
    alignContent: "flex-end"
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
  },
  buttonText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 16,
    fontWeight: "bold",
  },
});
