import { auth, fireStore } from "../firebase/firebaseConfig"; 
import { collection, addDoc, doc, updateDoc, arrayUnion, getDoc, query, getDocs, where } from "firebase/firestore"; 

const saveSoilTest = async (soilData: { nitrogen: string; phosphorus: string; potassium: string; pH: string; soilType: string }) => {
    const user = auth.currentUser;

  if (!user) {
    console.error("No user logged in!");
    return;
  }

  try {
    const soilTestRef = await addDoc(collection(fireStore, "soiltest"), {
      userId: user.uid, 
      nitrogen: soilData.nitrogen,
      phosphorus: soilData.phosphorus,
      potassium: soilData.potassium,
      pH: soilData.pH,
      soilType: soilData.soilType,
        createdAt: new Date().toISOString(),
    });

    const userRef = doc(fireStore, "users", user.uid);
    await updateDoc(userRef, {
        soilTests: arrayUnion(soilTestRef.id)
    });

    console.log("Soil test saved and linked to user!");
  } catch (error) {
    console.error("Error saving soil test:", error);
  }
};


// import { firestore, auth } from "../firebase/firebaseConfig"; 
// import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";

const fetchUserSoilTests = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user logged in!");
    return [];
  }

  try {
    // 1️⃣ Get the user's document to retrieve soilTests array
    const userRef = doc(fireStore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error("User document not found!");
      return [];
    }

    const soilTestIds = userDoc.data().soilTests || [];
    
    if (soilTestIds.length === 0) {
      console.log("No soil tests found for this user.");
      return [];
    }

    // 2️⃣ Fetch the soil tests using the stored IDs
    const q = query(collection(fireStore, "soiltest"), where("__name__", "in", soilTestIds));
    const querySnapshot = await getDocs(q);

    const soilTests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched Soil Tests:", soilTests);
    return soilTests;
  } catch (error) {
    console.error("Error fetching soil tests:", error);
    return [];
  }
};

