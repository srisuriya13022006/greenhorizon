import 'react-native-gesture-handler';
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, View, ScrollView, SafeAreaView } from "react-native";



function WelcomeScreen() {
  const [selectedOption, setSelectedOption] = useState<'terrace' | 'garden'>('terrace');

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Fixed Top Section */}
      <View style={styles.fixedTop}>
      <ThemedText type="title" style={{ color: "white",height:45, top:-10 }}>GREEN HORIZON</ThemedText>

      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollableContent} keyboardShouldPersistTaps="handled">
      <ThemedText type="title">Welcome Aboard!</ThemedText>
      <ThemedText type="title"></ThemedText>
        <ThemedText type="default">
          Welcome to the world of farming and agriculture, where every seed you plant is a step towards a greener, more vibrant tomorrow. 
          Here, you will discover the joy of nurturing life, the peace found in nature’s embrace, and the satisfaction of watching your 
          efforts bloom into beauty and bounty. Whether you’re cultivating a small garden or transforming a terrace into a lush oasis, 
          your journey begins here. Embrace the art of growth, the magic of soil, and the promise of a flourishing future. Let’s sow the 
          seeds of hope and harvest the joys of nature together.
        </ThemedText>

        <ThemedText type="title"></ThemedText>
        <ThemedText type="title">Get Started with Your Farmland</ThemedText>
        <ThemedText type="title"></ThemedText>

        <ThemedText type="default">
          Starting an agricultural journey to grow daily required vegetables is a rewarding endeavor. Here are some practical tips for beginners:
        </ThemedText>

        <ThemedText type="defaultSemiBold">1. Choose the Right Location</ThemedText>
        <ThemedText type="default">- Sunlight: Ensure your garden area gets at least 6-8 hours of sunlight per day.</ThemedText>
        <ThemedText type="default">- Soil: Choose a spot with well-draining soil to prevent waterlogging.</ThemedText>
        <ThemedText type="default">- Accessibility: Make sure it's convenient to water and maintain.</ThemedText>

        <ThemedText type="defaultSemiBold">2. Prepare the Soil</ThemedText>
        <ThemedText type="default">- Test Your Soil: Check for pH and nutrient levels.</ThemedText>
        <ThemedText type="default">- Add Organic Matter: Enrich the soil with compost or aged manure to improve fertility.</ThemedText>

        <ThemedText type="defaultSemiBold">3. Plan Your Farmland Layout</ThemedText>
        <ThemedText type="default">- Spacing: Leave enough space between plants for growth and air circulation.</ThemedText>
        <ThemedText type="default">- Companion Planting: Some plants grow better together (e.g., tomatoes and basil).</ThemedText>

        <ThemedText type="defaultSemiBold">4. Select Seeds or Seedlings</ThemedText>
        <ThemedText type="default">- Quality Seeds: Buy from reputable sources.</ThemedText>

        <ThemedText type="defaultSemiBold">5. Watering</ThemedText>
        <ThemedText type="default">- Consistent Watering: Keep the soil consistently moist, but not waterlogged.</ThemedText>
        <ThemedText type="default">- Morning Watering: Water early in the morning to reduce evaporation and prevent diseases.</ThemedText>

        <ThemedText type="defaultSemiBold">6. Fertilize Appropriately</ThemedText>
        <ThemedText type="default">- Balanced Fertilizer: Use a balanced, all-purpose vegetable fertilizer.</ThemedText>
        <ThemedText type="default">- Follow Instructions: Apply fertilizers as per the package instructions.</ThemedText>

        <ThemedText type="defaultSemiBold">7. Pest and Disease Management</ThemedText>
        <ThemedText type="default">- Natural Methods: Use insecticidal soap, neem oil, or introduce beneficial insects like ladybugs.</ThemedText>
        <ThemedText type="default">- Regular Inspection: Check plants regularly for signs of pests or disease.</ThemedText>

        <ThemedText type="defaultSemiBold">8. Harvesting</ThemedText>
        <ThemedText type="default">- Pick Regularly: Harvest vegetables as soon as they’re ripe to encourage continuous production.</ThemedText>
        <ThemedText type="default">- Proper Techniques: Use the correct techniques to avoid damaging plants (e.g., twist and pull for tomatoes).</ThemedText>
        <ThemedText type="title"></ThemedText>
        <ThemedText type="title">Common Natural Fertilizers and Manures</ThemedText>
        <ThemedText type="title"></ThemedText>
        <ThemedText type="default">
          Compost, Animal Manure, Green Manure, Bone Meal, Fish Emulsion, Blood Meal, Seaweed, Bat Guano, Worm Castings, Feather Meal, 
          Cottonseed Meal, Rock Phosphate, Greensand, Wood Ash, Manure Tea.
        </ThemedText>

        <ThemedText type="default">
          Keep Learning !! Starting your farming journey with these tips can help ensure a successful and enjoyable experience. Happy farming!
        </ThemedText>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.proceedButton} >
          <ThemedText type="defaultSemiBold">Click Dashboard to continue</ThemedText>
        </TouchableOpacity>

        {/* Bottom Icons */}
       
      </ScrollView>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    marginTop: 30,
    height:2,
    
    color:"white",
    backgroundColor: "white",
  },
  fixedTop: {
    backgroundColor: "#1A5C0D",
    color:"white",
    height:2,
    padding: 50,
    borderBottomWidth: 4,
    borderBottomColor: "gray",
  },
  scrollableContent: {
    padding: 35,
  },
  proceedButton: {
    // backgroundColor: 'green',
    padding: 5,
    width:290,
    borderRadius: 200,
    alignItems: 'center',
    marginTop: 20,
  },


});
