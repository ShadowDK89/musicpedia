import { TSearchResult } from "../Models/TSearchResult";
import { db } from "../services/firebase";

export async function getSearchResult(searchTerm: string) {
  let searchToLower = searchTerm.toLowerCase();
  let newSearchList: TSearchResult[] = [];
  if (searchToLower === "") {
    const unsubscibe = await db.collection("/searchIndex").onSnapshot((snapshot) => {
      newSearchList = snapshot.docs.map((doc) => ({
        id: doc.id,
        musicianId: doc.data().musicianId,
        name: doc.data().name,
        genres: doc.data().genres,
        origin: doc.data().origin,
      }));
      //setSearchList(newSearchList);
    });
    console.log(unsubscibe());
    
    return () => unsubscibe();
  } else {
    const unsubscibe = db
      .collection("/searchIndex")
      .where("name", "==", searchToLower)
      .onSnapshot((snapshot) => {
        newSearchList = snapshot.docs.map((doc) => ({
          id: doc.id,
          musicianId: doc.data().musicianId,
          name: doc.data().name,
          genres: doc.data().genres,
          origin: doc.data().origin,
          musicianDoc: doc.data().musicianDoc,
        }));
        //setSearchList(newSearchList);
      });
    return () => unsubscibe();
  }
}
