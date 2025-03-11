import React, { Profiler, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Login";  // Make sure these paths are correct
import WelcomeScreen from './WelcomeScreen';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import SignupScreen from "./signUp";
import { PlantDetails, SoilReportForm } from "./PlantManagement";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import GreenAppButtons from "./GreenAppButtons";
import SoilListing from "./SoilListing";
import PlantUpload from "./PlantUpload";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigator = () => {  
  return (
    <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name='Home' component={WelcomeScreen} options={{ title: "Home",headerShown:false, tabBarIcon: ({ focused }) => (<Image source={require('../../assets/images/home.png')} style={{ height: 30, width: 30 }} />) }} />
    <Tab.Screen name='Search' component={GreenAppButtons} options={{ title: "DashBoard", tabBarIcon: ({ focused }) => (<Image source={require('../../assets/images/dashboard.png')} style={{ height: 30, width: 30 }} />) }} />
  </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    })
  })
  return (
    // <NavigationContainer>
      <Stack.Navigator>
      {user ? (
        <>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
         <Stack.Screen
              name="SoilPage"
              component={SoilListing}
              options={{ title: "Soil Analysis" }}
          />
          <Stack.Screen
              name="PlantPage"
              component={PlantUpload}
              options={{ title: "Crop Requirements" }}
          />
          </>
      ) : (
          <>
          <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="home" component={TabNavigator}/>
            </>
        )}
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

