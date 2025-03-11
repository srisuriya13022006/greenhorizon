import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireStore } from '../firebase/firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

// Define navigation type
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const SignupScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignup = async () => {
    if (!email || !password || !fullName || !phoneNumber) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    try {
      // Create user in Firebase Authentication
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      // Store user data in Firestore
      await setDoc(doc(fireStore, "users", user.uid), {
        fullName,
        email,
        phoneNumber,
        soilTests: [],
        plantTests:[],
        createdAt: new Date(),
      });

      console.log("User created and data stored in Firestore");
      Alert.alert("Success", "User registered successfully!");
      navigation.navigate("Login");
      
    } catch (error: any) {
      console.log(error);
      Alert.alert("Sign up failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('../../assets/images/pexels-david-alberto-carmona-coto-434794-1151418.jpg')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry autoCapitalize="none" />
{isLoading?<ActivityIndicator size='large' color='#0000ff'/>:<></>}
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 55, borderColor: 'green', borderWidth: 3, paddingHorizontal: 30, borderRadius: 17, marginBottom: 20 },
  button: { backgroundColor: 'green', padding: 20, borderRadius: 70, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  link: { color: 'blue', textAlign: 'center', marginTop: 20 },
  reactLogo: { height: 250, width: 390, bottom: 0, left: 0, position: 'absolute' },
});
