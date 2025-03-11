
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Image,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// export default function PlantScreen() {
//   const [plants, setPlants] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [name, setName] = useState("");
//   const [isNew, setIsNew] = useState("");
//   const [condition, setCondition] = useState("");
//   const [yieldQuality, setYieldQuality] = useState("");
//   const [selectedPlant, setSelectedPlant] = useState(null);
//   const [showImageOptions, setShowImageOptions] = useState(false);

//   const addPlant = () => {
//     if (name && isNew && condition && yieldQuality) {
//       const newPlant = { 
//         id: plants.length + 1, 
//         name, 
//         isNew, 
//         condition, 
//         yieldQuality, 
//         image: null // Initial state for image
//       };
//       setPlants([...plants, newPlant]);
//       setShowForm(false);
//       setName("");
//       setIsNew("");
//       setCondition("");
//       setYieldQuality("");
//     }
//   };

//   const removePlant = (id) => {
//     setPlants(plants.filter((plant) => plant.id !== id));
//     if (selectedPlant && selectedPlant.id === id) {
//       setSelectedPlant(null);
//     }
//   };

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert("Permission to access gallery is required!");
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       updatePlantImage(selectedPlant.id, result.assets[0].uri);
//     }
//   };

//   const openCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert("Permission to access camera is required!");
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       updatePlantImage(selectedPlant.id, result.assets[0].uri);
//     }
//   };

//   const updatePlantImage = (id, imageUri) => {
//     setPlants(plants.map((plant) => 
//       plant.id === id ? { ...plant, image: imageUri } : plant
//     ));
//     setSelectedPlant({ ...selectedPlant, image: imageUri });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Plants</Text>
//       </View>

//       <FlatList
//         data={plants}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.plantContainer}>
//             <TouchableOpacity onPress={() => setSelectedPlant(item)} style={styles.plantItem}>
//               <Text style={styles.plantName}>{item.name}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.removeButton} onPress={() => removePlant(item.id)}>
//               <Text style={styles.buttonText}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       {selectedPlant && (
//         <View style={styles.detailsContainer}>
//           <View style={styles.detailsHeader}>
//             <Text style={styles.detailsText}>🌿 {selectedPlant.name}</Text>
//             {selectedPlant.image ? (
//               <Image source={{ uri: selectedPlant.image }} style={styles.image} />
//             ) : (
//               <View style={styles.imagePlaceholder} />
//             )}
//           </View>
//           <Text>New Plant? {selectedPlant.isNew}</Text>
//           <Text>Condition: {selectedPlant.condition}</Text>
//           <Text>Yield: {selectedPlant.yieldQuality}</Text>
//           <TouchableOpacity
//             style={styles.addImageButton}
//             onPress={() => setShowImageOptions(!showImageOptions)}
//           >
//             <Text style={styles.buttonText}>Add Image</Text>
//           </TouchableOpacity>

//           {showImageOptions && (
//   <View style={styles.imageOptions}>
//     <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
//       <Text style={styles.buttonText}>Open Cam</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
//       <Text style={styles.buttonText}>Upload</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPlant(null)}>
//       <Text style={styles.buttonText}>Close</Text>
//     </TouchableOpacity>
//   </View>
// )}

//         </View>
//       )}

//       {!showForm ? (
//         <TouchableOpacity style={styles.addPlantButton} onPress={() => setShowForm(true)}>
//           <Text style={styles.buttonText}>Add Plant</Text>
//         </TouchableOpacity>
//       ) : (
//         <View style={styles.form}>
//           <TextInput style={styles.input} placeholder="Plant Name" value={name} onChangeText={setName} />
//           <TextInput style={styles.input} placeholder="New Plant? (Yes/No)" value={isNew} onChangeText={setIsNew} />
//           <TextInput style={styles.input} placeholder="Condition (Good/Bad/Moderate)" value={condition} onChangeText={setCondition} />
//           <TextInput style={styles.input} placeholder="Yield (Good/Moderate/Bad)" value={yieldQuality} onChangeText={setYieldQuality} />
//           <TouchableOpacity style={styles.addPlantButton} onPress={addPlant}>
//             <Text style={styles.buttonText}>Save Plant</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     backgroundColor: "green",
//     padding: 15,
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "white",
//   },
//   plantContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//   },
//   plantItem: {
//     padding: 15,
//     backgroundColor: "#E0F7E9",
//     marginVertical: 5,
//     borderRadius: 5,
//     flex: 1,
//   },
//   plantName: {
//     fontSize: 18,
//     color: "green",
//   },
//   removeButton: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   detailsContainer: {
//     backgroundColor: "#F5F5F5",
//     padding: 15,
//     margin: 10,
//     borderRadius: 5,
//   },
//   detailsHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   imagePlaceholder: {
//     width: 50,
//     height: 50,
//     backgroundColor: "#ddd",
//     borderRadius: 5,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//   },
//   addImageButton: {
//     backgroundColor: "#6AB733",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: "center",
//   },
//   imageOptions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//   },
//   optionButton: {
//     backgroundColor: "#713333",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   form: {
//     padding: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#6AB733",
//     padding: 8,
//     marginVertical: 5,
//     borderRadius: 5,
//     backgroundColor: "#F8F0EB",
//   },
//   addPlantButton: {
//     backgroundColor: "#713333",
//     padding: 10,
//     borderRadius: 5,
//     margin: 15,
//     alignItems: "center",
//   },
//   closeButton: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 5,
//   },
  
// });