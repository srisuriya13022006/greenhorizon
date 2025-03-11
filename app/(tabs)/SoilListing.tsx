import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ScrollView, StyleSheet, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { fireStore, auth } from "../firebase/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";  // Import Axios for backend requests

type SoilReport = {
  id?: string;
  reportName: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  soilPh: string;
  soilType: string;
};

const SoilListing = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [soilReports, setSoilReports] = useState<SoilReport[]>([]);
  const [formData, setFormData] = useState<SoilReport>({
    reportName: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    soilPh: '',
    soilType: 'clay',
  });

  useEffect(() => {
    const fetchSoilReports = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userSnapshot = await getDocs(collection(fireStore, "soiltest"));
        const userSoilTests = userSnapshot.docs
          .filter(doc => doc.data().userId === user.uid)
          .map(doc => ({ id: doc.id, ...doc.data() })) as SoilReport[];

        setSoilReports(userSoilTests);
      } catch (error) {
        console.error("Error fetching soil tests:", error);
      }
    };

    fetchSoilReports();
  }, []);

  const handleChange = (key: keyof SoilReport, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateAndSubmit = async () => {
    if (Object.values(formData).some(value => value.trim() === '')) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "User not logged in!");
      return;
    }

    try {
      // 1️⃣ Send data to backend first
      const backendResponse = await axios.post("http://127.0.0.1:5000/soilreport", {
        nitrogen: formData.nitrogen,
        phosphorus: formData.phosphorus,
        potassium: formData.potassium,
        ph: formData.soilPh,
        soilTexture: formData.soilType,
      });

      console.log("Backend Response:", backendResponse.data);

      const { cropRecommendations, fertilizerRecommendation } = backendResponse.data;

      // 3️⃣ Save report to Firestore after backend response
      const soilTestRef = await addDoc(collection(fireStore, "soiltest"), {
        userId: user.uid,
        ...formData,
        cropRecommendations,
        fertilizerRecommendation,
        createdAt: new Date().toISOString(),
      });

      // 4️⃣ Link the test to the user
      const userRef = doc(fireStore, "users", user.uid);
      await updateDoc(userRef, {
        soilTests: arrayUnion(soilTestRef.id),
      });

      // ✅ Update UI
      setSoilReports([...soilReports, { id: soilTestRef.id, ...formData }]);
      setFormData({ reportName: '', nitrogen: '', phosphorus: '', potassium: '', soilPh: '', soilType: 'clay' });
      setModalVisible(false);
      
      Alert.alert("Success", "Soil report added with recommendations!");

    } catch (error) {
      console.error("Error processing soil test:", error);
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
                <RadioButton.Android value={type} status={formData.soilType === type ? "checked" : "unchecked"} onPress={() => handleChange("soilType", type)} />
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

// export default SoilListing;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8F4",
    padding: 20,
  },
  card: {
    backgroundColor: "#A98E6F",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
  },
  cardText: {
    color: "#3A5A40",
  },
  addButton: {
    backgroundColor: "#3A5A40",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#F8F8F7",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#BAA28A",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EFEDDD",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F9F7ED",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F9F7ED",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  radioText: {
    color: "#FEFAE0",
  },
  submitButton: {
    backgroundColor: "#283618",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
      marginTop: 10,
      marginBottom:40,
    alignItems: "center",
  },
  cancelText: {
    color: "#FEFAE0",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#543A14",
    paddingVertical: 5,  // Increased vertical padding
    paddingHorizontal: 5, // Increased horizontal padding
    borderRadius: 10,  // Slightly rounded corners
    marginTop: 8,
    alignItems: "center",
    width: "20%",  // Adjust width (optional)
    alignSelf: "center",  // Center the button inside the card
  },
  
  removeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,  // Increased font size
  },
  
});

export default SoilListing;
