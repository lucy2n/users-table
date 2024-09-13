import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, update, get, runTransaction } from "firebase/database";
import { auth, db } from './firebase';

export const registerUser = async (email, password, username) => {
  const emailKey = email.replace('.', ',');

  const emailRef = ref(db, `emails/${emailKey}`);

  return runTransaction(emailRef, (currentValue) => {
      if (currentValue === null) {
          return true;
      } else {
          return;
      }
  }).then(async (transactionResult) => {
      if (transactionResult.committed) {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          await set(ref(db, 'users/' + user.uid), {
              id: user.uid,
              username,
              email: user.email,
              registration_date: new Date().toISOString(),
              last_login: new Date().toISOString(),
              status: 'active',
          });

          return user;
      } else {
          throw new Error('Email is already in use.');
      }
  }).catch((error) => {
      throw error;
  });
};

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = ref(db, 'users/' + user.uid);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.status === 'blocked') {
          throw new Error('User is blocked and cannot sign in.');
        }

        await update(userRef, {
          last_login: new Date().toISOString(),
        });

        return user;
    } else {
        throw new Error('User data not found in the database.');
    }
};