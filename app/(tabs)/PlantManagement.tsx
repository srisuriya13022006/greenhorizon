
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

type SoilData = {
  nitrogen: string;
  phosphorus: string;
  calcium: string;
  magnesium: string;
  zinc: string;
  iron: string;
  boron: string;
  soilPh: string;
  organicMatter: string;
  soilType: "clay" | "loam" | "sandy" | "silt";
};

type Props = {
  navigation: NavigationProp<any>;
};

const Stack = createStackNavigator();

export const SoilReportForm: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<SoilData>({
    nitrogen: "",
    phosphorus: "",
    calcium: "",
    magnesium: "",
    zinc: "",
    iron: "",
    boron: "",
    soilPh: "",
    organicMatter: "",
    soilType: "clay",
  });

  const handleChange = (name: keyof SoilData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    navigation.navigate("PlantDetails");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Soil Report Input</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Macronutrients (mg/kg)</Text>
        {(["nitrogen", "phosphorus", "calcium", "magnesium"] as (keyof SoilData)[]).map((item) => (
          <TextInput
            key={item}
            style={styles.input}
            placeholder={`${item.charAt(0).toUpperCase() + item.slice(1)} (mg/kg)`}
            keyboardType="numeric"
            onChangeText={(value) => handleChange(item, value)}
            value={formData[item]}
          />
        ))}

        <Text style={styles.label}>Micronutrients (ppm)</Text>
        {(["zinc", "iron", "boron"] as (keyof SoilData)[]).map((item) => (
          <TextInput
            key={item}
            style={styles.input}
            placeholder={`${item.charAt(0).toUpperCase() + item.slice(1)} (ppm)`}
            keyboardType="numeric"
            onChangeText={(value) => handleChange(item, value)}
            value={formData[item]}
          />
        ))}

        <Text style={styles.label}>Other Parameters</Text>
        <TextInput
          style={styles.input}
          placeholder="Soil pH (0-14)"
          keyboardType="numeric"
          onChangeText={(value) => handleChange("soilPh", value)}
          value={formData.soilPh}
        />
        <TextInput
          style={styles.input}
          placeholder="Organic Matter (%)"
          keyboardType="numeric"
          onChangeText={(value) => handleChange("organicMatter", value)}
          value={formData.organicMatter}
        />
      </View>

      <View style={styles.soilTypeBox}>
        <Text style={styles.label}>Soil Type</Text>
        {(["clay", "loam", "sandy", "silt"] as SoilData["soilType"][]).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.radioButton,
              formData.soilType === type ? styles.radioSelected : {},
            ]}
            onPress={() => handleChange("soilType", type)}
          >
            <Text style={styles.radioText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// 📌 Plant Details Page
export const PlantDetails: React.FC = () => {
  const [plantName, setPlantName] = useState("");
  const [yieldCondition, setYieldCondition] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Plant Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={plantName}
        onChangeText={setPlantName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Yield Condition"
        value={yieldCondition}
        onChangeText={setYieldCondition}
      />

      <View style={styles.container}>
        <TouchableOpacity style={styles.uploadButton} onPress={openCamera}>
          <Text style={styles.uploadButtonText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};




const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#F4F1E9" },
  header: { backgroundColor: "#4CAF50", padding: 20, alignItems: "center", borderRadius: 10, marginBottom: 15 },
  headerText: { fontSize: 20, fontWeight: "bold", color: "black" },
  form: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", color: "#3E2723", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#8D6E63", borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#FAFAFA" },
  soilTypeBox: { backgroundColor: "white", borderWidth: 2, borderColor: "#4CAF50", padding: 15, borderRadius: 10, alignItems: "center" },
  radioButton: { padding: 10, marginVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: "#8D6E63", width: "80%", alignItems: "center", backgroundColor: "#FAFAFA" },
  radioSelected: { backgroundColor: "#4CAF50", borderColor: "#2E7D32" },
  radioText: { fontSize: 16, fontWeight: "bold", color: "#3E2723" },
  submitButton: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  submitButtonText: { fontSize: 18, fontWeight: "bold", color: "white" },
  uploadButton: { backgroundColor: "#41C63F", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  uploadButtonText: { fontSize: 18, fontWeight: "bold", color: "white" },
  image: { width: 200, height: 200, marginTop: 10, alignSelf: "center", borderRadius: 10 },
});
