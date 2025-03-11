import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { ScrollView ,StyleSheet,TextInput} from "react-native";
import { RootStackParamList } from "./types"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";

type terracePageNavigationProp = NativeStackNavigationProp<RootStackParamList, "terrace">;
function TerracePage() {
  const [sunlightPercentage, setSunlightPercentage] = useState('');
  const [soilPH, setSoilPH] = useState('');
    const [suggestedPlants, setSuggestedPlants] = useState<string[]>([]);
    const navigation = useNavigation<terracePageNavigationProp>();

  const handleCalculate = () => {
    const sunlight = parseFloat(sunlightPercentage);
    const ph = parseFloat(soilPH);

    if (isNaN(sunlight)) {
      Alert.alert('Invalid Input', 'Please enter a valid sunlight percentage.');
      return;
    }

    if (isNaN(ph)) {
      Alert.alert('Invalid Input', 'Please enter a valid soil pH level.');
      return;
    }

    let plants: string[] = [];

    if (sunlight >= 70 && ph >= 6 && ph <= 7) {
      plants = ['Tomatoes', 'Peppers', 'Cucumbers', 'Basil'];
    } else if (sunlight >= 50 && ph >= 5.5 && ph <= 6.5) {
      plants = ['Lettuce', 'Spinach', 'Kale', 'Mint'];
    } else {
      plants = ['No suitable plants found for the given conditions.'];
    }

    setSuggestedPlants(plants);
  };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <ThemedText type="title">Terrace Gardening</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Sunlight Percentage (e.g., 70)"
        value={sunlightPercentage}
        onChangeText={setSunlightPercentage}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Soil pH Level (e.g., 6.5)"
        value={soilPH}
        onChangeText={setSoilPH}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <ThemedText type="defaultSemiBold">Calculate Suitable Plants</ThemedText>
      </TouchableOpacity>
      {suggestedPlants.length > 0 && (
        <ThemedText type="defaultSemiBold">Suggested Plants:</ThemedText>
      )}
      {suggestedPlants.map((plant, index) => (
        <ThemedText key={index} type="default">{plant}</ThemedText>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 55,
    borderColor: 'green',
    borderWidth: 3,
    paddingHorizontal: 30,
    borderRadius: 17,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 70,
    alignItems: 'center',
    marginBottom: 20,
  },
  pageContainer: {
    padding: 40,
    
  },
  
  
  
  
});


export default TerracePage;
