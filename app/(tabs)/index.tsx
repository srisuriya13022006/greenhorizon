import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, Alert, View, Text, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons'; // For icons

interface AuthScreenProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

function AuthScreen({ setIsLoggedIn }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAuth = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (isLogin) {
      setIsLoggedIn(true);
      Alert.alert('Login Successful', `Welcome back, ${email}!`);
    } else {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      setIsLoggedIn(true);
      Alert.alert('Signup Successful', `Welcome, ${email}!`);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/pexels-david-alberto-carmona-coto-434794-1151418.jpg')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{isLogin ? 'Login' : 'Sign Up'}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        )}
        <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
          <ThemedText type="defaultSemiBold">
            {showPassword ? 'Hide Password' : 'Show Password'}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <ThemedText type="defaultSemiBold">{isLogin ? 'Login' : 'Sign Up'}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <ThemedText type="defaultSemiBold">
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

interface WelcomeScreenProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
  setSelectedPage: (page: 'terrace' | 'garden') => void;
}

function WelcomeScreen({ setIsLoggedIn, setSelectedPage }: WelcomeScreenProps) {
  const [selectedOption, setSelectedOption] = useState<'terrace' | 'garden'>('terrace');

  const handleProceed = () => {
    setSelectedPage(selectedOption); // Redirect to the selected page
  };

  const handleBack = () => {
    setIsLoggedIn(false); // Go back to the login page
  };

  return (
    <ScrollView contentContainerStyle={styles.welcomeContainer}>
      <ThemedText type="title">Welcome to the realm of nature’s miracles. Let your gardening journey begin!</ThemedText>
      <ThemedText type="default">
        Welcome to the world of gardening and agriculture, where every seed you plant is a step towards a greener, more vibrant tomorrow. Here, you will discover the joy of nurturing life, the peace found in nature’s embrace, and the satisfaction of watching your efforts bloom into beauty and bounty. Whether you’re cultivating a small garden or transforming a terrace into a lush oasis, your journey begins here. Embrace the art of growth, the magic of soil, and the promise of a flourishing future. Let’s sow the seeds of hope and harvest the joys of nature together.
      </ThemedText>
      <ThemedText type="title">Welcome aboard!</ThemedText>
      <ThemedText type="title">Get Started with Your Garden</ThemedText>
      <ThemedText type="default">
        Starting a gardening journey to grow daily required vegetables is a rewarding endeavor. Here are some practical tips for beginners:
      </ThemedText>
      <ThemedText type="defaultSemiBold">1. Choose the Right Location</ThemedText>
      <ThemedText type="default">- Sunlight: Ensure your garden area gets at least 6-8 hours of sunlight per day.</ThemedText>
      <ThemedText type="default">- Soil: Choose a spot with well-draining soil to prevent waterlogging.</ThemedText>
      <ThemedText type="default">- Accessibility: Make sure it's convenient to water and maintain.</ThemedText>
      <ThemedText type="defaultSemiBold">2. Start Small</ThemedText>
      <ThemedText type="default">- Begin with a few easy-to-grow vegetables: Tomatoes, lettuce, radishes, carrots, and herbs.</ThemedText>
      <ThemedText type="default">- Container Gardening: If space is limited, use pots or containers.</ThemedText>
      <ThemedText type="defaultSemiBold">3. Prepare the Soil</ThemedText>
      <ThemedText type="default">- Test Your Soil: Check for pH and nutrient levels.</ThemedText>
      <ThemedText type="default">- Add Organic Matter: Enrich the soil with compost or aged manure to improve fertility.</ThemedText>
      <ThemedText type="defaultSemiBold">4. Plan Your Garden Layout</ThemedText>
      <ThemedText type="default">- Spacing: Leave enough space between plants for growth and air circulation.</ThemedText>
      <ThemedText type="default">- Companion Planting: Some plants grow better together (e.g., tomatoes and basil).</ThemedText>
      <ThemedText type="defaultSemiBold">5. Select Seeds or Seedlings</ThemedText>
      <ThemedText type="default">- Quality Seeds: Buy from reputable sources.</ThemedText>
      <ThemedText type="default">- Seedlings: Starting with seedlings can be easier for beginners.</ThemedText>
      <ThemedText type="defaultSemiBold">6. Watering</ThemedText>
      <ThemedText type="default">- Consistent Watering: Keep the soil consistently moist, but not waterlogged.</ThemedText>
      <ThemedText type="default">- Morning Watering: Water early in the morning to reduce evaporation and prevent diseases.</ThemedText>
      <ThemedText type="defaultSemiBold">7. Fertilize Appropriately</ThemedText>
      <ThemedText type="default">- Balanced Fertilizer: Use a balanced, all-purpose vegetable fertilizer.</ThemedText>
      <ThemedText type="default">- Follow Instructions: Apply fertilizers as per the package instructions.</ThemedText>
      <ThemedText type="defaultSemiBold">8. Mulch</ThemedText>
      <ThemedText type="default">- Retain Moisture: Use organic mulch like straw, grass clippings, or leaves to retain moisture and suppress weeds.</ThemedText>
      <ThemedText type="default">- Temperature Regulation: Mulch helps maintain soil temperature.</ThemedText>
      <ThemedText type="defaultSemiBold">9. Pest and Disease Management</ThemedText>
      <ThemedText type="default">- Natural Methods: Use insecticidal soap, neem oil, or introduce beneficial insects like ladybugs.</ThemedText>
      <ThemedText type="default">- Regular Inspection: Check plants regularly for signs of pests or disease.</ThemedText>
      <ThemedText type="defaultSemiBold">10. Harvesting</ThemedText>
      <ThemedText type="default">- Pick Regularly: Harvest vegetables as soon as they’re ripe to encourage continuous production.</ThemedText>
      <ThemedText type="default">- Proper Techniques: Use the correct techniques to avoid damaging plants (e.g., twist and pull for tomatoes).</ThemedText>
      <ThemedText type="title">Common Natural Fertilizers and Manures</ThemedText>
      <ThemedText type="default">Compost, Animal Manure, Green Manure, Bone Meal, Fish Emulsion, Blood Meal, Seaweed, Bat Guano, Worm Castings, Feather Meal, Cottonseed Meal, Rock Phosphate, Greensand, Wood Ash, Manure Tea.</ThemedText>
      <ThemedText type="default">Keep Learning !! Starting your gardening journey with these tips can help ensure a successful and enjoyable experience. Happy gardening!</ThemedText>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => setSelectedOption('terrace')} style={styles.radioButton}>
          <View style={[styles.radioCircle, selectedOption === 'terrace' && styles.radioSelected]} />
          <ThemedText type="defaultSemiBold">Terrace</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption('garden')} style={styles.radioButton}>
          <View style={[styles.radioCircle, selectedOption === 'garden' && styles.radioSelected]} />
          <ThemedText type="defaultSemiBold">Garden</ThemedText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <ThemedText type="defaultSemiBold">Proceed</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ThemedText type="defaultSemiBold">Back to Login</ThemedText>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home" size={24} color="green" />
          <ThemedText type="defaultSemiBold">Home</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person" size={24} color="green" />
          <ThemedText type="defaultSemiBold">Profile</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="grid" size={24} color="green" />
          <ThemedText type="defaultSemiBold">Dashboard</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function TerracePage({ setSelectedPage }: { setSelectedPage: (page: null) => void }) {
  const [sunlightPercentage, setSunlightPercentage] = useState('');
  const [soilPH, setSoilPH] = useState('');
  const [suggestedPlants, setSuggestedPlants] = useState<string[]>([]);

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
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedPage(null)}>
        <ThemedText type="defaultSemiBold">Back to Welcome</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

function GardenPage({ setSelectedPage }: { setSelectedPage: (page: null) => void }) {
  const [sunlightPercentage, setSunlightPercentage] = useState('');
  const [soilPH, setSoilPH] = useState('');
  const [suggestedPlants, setSuggestedPlants] = useState<string[]>([]);

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

    if (sunlight >= 80 && ph >= 6 && ph <= 7.5) {
      plants = ['Tomatoes', 'Carrots', 'Beans', 'Rosemary'];
    } else if (sunlight >= 60 && ph >= 5.5 && ph <= 7) {
      plants = ['Lettuce', 'Cabbage', 'Broccoli', 'Thyme'];
    } else {
      plants = ['No suitable plants found for the given conditions.'];
    }

    setSuggestedPlants(plants);
  };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <ThemedText type="title">Garden Gardening</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Sunlight Percentage (e.g., 80)"
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
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedPage(null)}>
        <ThemedText type="defaultSemiBold">Back to Welcome</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 23,
  },
  stepContainer: {
    gap: 10,
    marginBottom: 8,
  },
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
  showPasswordButton: {
    marginTop: 8,
    padding: 20,
    borderRadius: 70,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  reactLogo: {
    height: 250,
    width: 390,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  welcomeContainer: {
    padding: 40,
    backgroundColor:"gold",
  },
  pageContainer: {
    padding: 40,
    
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: 'green',
  },
  proceedButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 70,
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 70,
    alignItems: 'center',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  iconButton: {
    alignItems: 'center',
  },
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPage, setSelectedPage] = useState<'terrace' | 'garden' | null>(null);

  if (selectedPage === 'terrace') {
    return <TerracePage setSelectedPage={setSelectedPage} />;
  }

  if (selectedPage === 'garden') {
    return <GardenPage setSelectedPage={setSelectedPage} />;
  }

  if (isLoggedIn) {
    return <WelcomeScreen setIsLoggedIn={setIsLoggedIn} setSelectedPage={setSelectedPage} />;
  }

  return <AuthScreen setIsLoggedIn={setIsLoggedIn} />;
}