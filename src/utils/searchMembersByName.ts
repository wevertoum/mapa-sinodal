import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export const searchMembersByName = async (
  name: string
): Promise<Models.Member[]> => {
  try {
    const membersRef = collection(db, "members");
    const q = query(
      membersRef,
      where("name", ">=", name),
      where("name", "<=", name + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);

    const members: Models.Member[] = [];
    querySnapshot.forEach((doc) => {
      members.push({ ...doc.data(), id: doc.id } as Models.Member);
    });

    return members;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
};
