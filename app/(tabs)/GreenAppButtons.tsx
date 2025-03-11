import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; // Ensure this file has correct types

const { height } = Dimensions.get("window");

// Define separate types for navigation
type SoilPageNavigationProp = NativeStackNavigationProp<RootStackParamList, "SoilPage">;
type PlantPageNavigationProp = NativeStackNavigationProp<RootStackParamList, "PlantPage">;

export default function GreenAppButtons() {
  const navigation = useNavigation<SoilPageNavigationProp & PlantPageNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SoilPage")}>
        <Text style={styles.buttonText}>Soil Analysis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PlantPage")}>
        <Text style={styles.buttonText}>Crop Requirement</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  button: {
    width: "90%",
    height: height * 0.35,
    backgroundColor: "#2E7D32",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
