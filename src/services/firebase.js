// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASLmv8Qhuk0pj6AGeTGiL2LCQ-iEZ7Iso",
  authDomain: "users-table-bfa3f.firebaseapp.com",
  databaseURL: "https://users-table-bfa3f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "users-table-bfa3f",
  storageBucket: "users-table-bfa3f.appspot.com",
  messagingSenderId: "801722176151",
  appId: "1:801722176151:web:e116b45786b5fdd2664fd2",
  measurementId: "G-C8SMWB7QJZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

// Функция для получения всех пользователей
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

// Функция для сохранения пользователя в Realtime Database
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

// Функция для удаления нескольких пользователей
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