import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchRoutes() {
  const snapshot = await getDocs(collection(db, "routes"));
  return snapshot.docs.map(doc => doc.data());
}
