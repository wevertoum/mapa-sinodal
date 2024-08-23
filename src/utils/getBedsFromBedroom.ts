import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getBedsFromBedroom = async (
  id_bedroom: string
): Promise<Models.Bed[]> => {
  try {
    const bedsRef = collection(db, "/beds");
    const q = query(bedsRef, where("id_bedroom", "==", id_bedroom));
    const querySnapshot = await getDocs(q);

    const beds: Models.Bed[] = [];
    querySnapshot.forEach((doc) => {
      beds.push({ ...doc.data(), id: doc.id } as Models.Bed);
    });

    return beds;
  } catch (error) {
    console.error("Error fetching beds:", error);
    return [];
  }
};
