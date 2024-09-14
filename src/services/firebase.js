import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, collection, getDocs, getDoc, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getUsers() {
  try {
    const usersCollectionRef = collection(db, 'User');
    const usersSnapshot = await getDocs(usersCollectionRef);
    return usersSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
}

export const blockUsers = async (userIds) => {
  try {
    const batch = writeBatch(db);

    userIds.forEach((userId) => {
      const userDocRef = doc(db, 'User', userId);
      batch.update(userDocRef, { status: 'blocked' });
    });

    await batch.commit();
  } catch (error) {
    console.error('Error blocking users:', error.message);
  }
};

export const unblockUsers = async (userIds) => {
  try {
    const batch = writeBatch(db);

    userIds.forEach((userId) => {
      const userDocRef = doc(db, 'User', userId);
      batch.update(userDocRef, { status: 'active' });
    });

    await batch.commit();
  } catch (error) {
    console.error('Error unblocking users:', error.message);
  }
};

export const deleteUser = async (id) => {
  const batch = writeBatch(db);

  const userDocRef = doc(db, 'User', id);
  const userSnapshot = await getDoc(userDocRef);
  const prevData = userSnapshot.data();

  batch.delete(userDocRef);

  const emailIndexRef = doc(db, 'Index', `User/email/${prevData.email}`);
  batch.delete(emailIndexRef);

  await batch.commit();
};