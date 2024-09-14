import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, updateDoc, getDoc, writeBatch } from 'firebase/firestore';


export const registerUser = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  const user = userCredential.user;

  const batch = writeBatch(db);

  const userDocRef = doc(db, 'User', user.uid);

  batch.set(userDocRef, {
    id: user.uid,
    username,
    email: user.email,
    registration_date: new Date().toISOString(),
    last_login: new Date().toISOString(),
    status: 'active',
  });

  const emailIndexRef = doc(db, 'Index', `User/email/${email}`);
  batch.set(emailIndexRef, {
    value: user.uid,
  });

  await batch.commit();

  return user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userIndexRef = doc(db, 'Index/User/email', user.email);
  const userIndexSnapshot = await getDoc(userIndexRef);
  const userUid = userIndexSnapshot.data().value;

  const userDocRef = doc(db, 'User', userUid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();

    if (userData.status === 'blocked') {
      throw new Error('User is blocked and cannot sign in.');
    }

    await updateDoc(userDocRef, {
      last_login: new Date().toISOString(),
    });

    return user;
  } else {
    throw new Error('User data not found in the database.');
  }
};