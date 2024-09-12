// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);


export async function getUsers() {
  const usersRef = ref(db, 'users/');
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([id, userData]) => ({
      id,
      ...userData,
    }));
  } else {
    return [];
  }
}

export const saveUserToDatabase = async (user) => {
  try {
    const userRef = ref(db, 'users/' + user.uid);
    await set(userRef, {
      email: user.email,
      username: user.username,
      registration_date: new Date().toISOString(),
      last_login: new Date().toISOString(),
      status: 'active',
    });
  } catch (error) {
    console.error('Error adding user to Realtime Database:', error.message);
  }
};


export const deleteUsers = async (userIds) => {
  try {
    const deletePromises = userIds.map(async (userId) => {
      const userRef = ref(db, 'users/' + userId);
      return await remove(userRef);
    });
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting users:', error.message);
  }
};

export const blockUsers = async (userIds) => {
  try {
    const blockPromises = userIds.map(async (userId) => {
      const userRef = ref(db, 'users/' + userId);
      return await update(userRef, { status: 'blocked' });
    });
    
    await Promise.all(blockPromises);
  } catch (error) {
    console.error('Error blocking users:', error.message);
  }
};


export const unblockUsers = async (userIds) => {
  try {
    const unblockPromises = userIds.map(async (userId) => {
      const userRef = ref(db, 'users/' + userId);
      return await update(userRef, { status: 'active' });
    });
    
    await Promise.all(unblockPromises);
  } catch (error) {
    console.error('Error unblocking users:', error.message);
  }
};