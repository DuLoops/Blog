import { db, storage } from "@/lib/firebase";
import { doc, getDoc, getDocFromCache } from "firebase/firestore";

const getLocation = async (locaitonDoc) => {
  const docRef = doc(db, "locations", locaitonDoc);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const locationInfo = {
    title: data.title,
    link:
      "https://www.google.com/maps/search/?api=1&query=" +
      data.formatted_address.replace(/ /g, "+"),
  };
  return await locationInfo;
};

export default getLocation;
