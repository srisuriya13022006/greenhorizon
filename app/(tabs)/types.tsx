import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define the type for stack screens
export type RootStackParamList = {
  Login: undefined;
    Signup: undefined;
  terrace: undefined
  SoilPage: undefined
  PlantPage: undefined,
  Home:undefined
};

// Type for navigation props in each screen
export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
