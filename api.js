
import { initializeApp } from "firebase/app"
import { 
    getFirestore, 
    collection, 
    doc, 
    getDocs, 
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAncEofVogZQYtGKIMnJCy6BjYy_mTPYYM",
  authDomain: "vanlife-b75dc.firebaseapp.com",
  projectId: "vanlife-b75dc",
  storageBucket: "vanlife-b75dc.appspot.com",
  messagingSenderId: "104194627061",
  appId: "1:104194627061:web:e6901423dfc4c60a51bcbc"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Refactoring fetch funtions

const vansCollectionRef = collection(db, "van")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans    
}

export async function getVan(id) {
    const docRef = doc(db,"van",id)
    const snapshot =  await getDoc(docRef) 
    return {
        ...snapshot.data(),
        id: snapshot.id
    }  
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans    
}


// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}