import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import axios from "axios";

type SoilReport = {
  id?: string;
  reportName: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  soilPh: string;
  soilType: string;
  cropRecommendations?: string[];
  fertilizerRecommendation?: string;
};

const SoilListing = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [soilReports, setSoilReports] = useState<SoilReport[]>([]);
  const [formData, setFormData] = useState<SoilReport>({
    reportName: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    soilPh: "",
    soilType: "clay",
  });

  const handleChange = (key: keyof SoilReport, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateAndSubmit = async () => {
    if (
      Object.values(formData).some(
        (value) => typeof value === "string" && value.trim() === ""
      )
    ) 
     {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }

    try {
      const backendPayload = {
        nitrogen: formData.nitrogen,
        phosphorus: formData.phosphorus,
        potassium: formData.potassium,
        ph: formData.soilPh,
        soilTexture: formData.soilType,
      };

      const backendResponse = await axios.post("http://127.0.0.1:5000/soilreport", backendPayload);

      const { cropRecommendations, fertilizerRecommendation } = backendResponse.data;

      const newReport: SoilReport = {
        ...formData,
        id: Math.random().toString(36).substring(2, 15),
        cropRecommendations,
        fertilizerRecommendation,
      };

      setSoilReports([...soilReports, newReport]);
      setFormData({
        reportName: "",
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        soilPh: "",
        soilType: "clay",
      });
      setModalVisible(false);
      Alert.alert("Success", "Soil report added with recommendations!");
    } catch (error: any) {
      console.error("❌ Error during submission:", error.message || error);
      Alert.alert("Error", "Failed to process soil test. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={soilReports}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.reportName}</Text>
            <Text style={styles.cardText}>Soil Type: {item.soilType}</Text>
            <Text style={styles.cardText}>pH Level: {item.soilPh}</Text>
            <Text style={styles.cardText}>Crop Recommendations:</Text>
            {item.cropRecommendations?.map((crop, index) => (
              <Text key={index} style={styles.recommendationItem}>• {crop}</Text>
            ))}
            <Text style={styles.cardText}>Fertilizer: {item.fertilizerRecommendation}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Report</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Soil Report</Text>

            <Text style={styles.label}>Report Name</Text>
            <TextInput style={styles.input} value={formData.reportName} onChangeText={(text) => handleChange("reportName", text)} placeholder="Enter report name" />

            <Text style={styles.label}>Nitrogen</Text>
            <TextInput style={styles.input} value={formData.nitrogen} onChangeText={(text) => handleChange("nitrogen", text)} keyboardType="numeric" placeholder="Enter Nitrogen level" />

            <Text style={styles.label}>Phosphorus</Text>
            <TextInput style={styles.input} value={formData.phosphorus} onChangeText={(text) => handleChange("phosphorus", text)} keyboardType="numeric" placeholder="Enter Phosphorus level" />

            <Text style={styles.label}>Potassium</Text>
            <TextInput style={styles.input} value={formData.potassium} onChangeText={(text) => handleChange("potassium", text)} keyboardType="numeric" placeholder="Enter Potassium level" />

            <Text style={styles.label}>Soil pH</Text>
            <TextInput style={styles.input} value={formData.soilPh} onChangeText={(text) => handleChange("soilPh", text)} keyboardType="numeric" placeholder="Enter Soil pH" />

            <Text style={styles.label}>Soil Type</Text>
            {["clay", "loam", "sandy", "silt"].map((type) => (
              <View key={type} style={styles.radioContainer}>
                <RadioButton.Android
                  value={type}
                  status={formData.soilType === type ? "checked" : "unchecked"}
                  onPress={() => handleChange("soilType", type)}
                />
                <Text style={styles.radioText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f0f0" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginVertical: 8, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  cardText: { fontSize: 14, marginBottom: 4 },
  recommendationItem: { fontSize: 13, marginLeft: 10 },
  addButton: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", margin: 20, borderRadius: 10, padding: 20, maxHeight: "90%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  label: { fontSize: 14, marginBottom: 5, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 },
  radioContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  radioText: { fontSize: 14 },
  submitButton: { backgroundColor: "#2196F3", padding: 12, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  cancelButton: { alignItems: "center", marginTop: 5 },
  cancelText: { color: "red", fontSize: 16 },
});

export default SoilListing;
