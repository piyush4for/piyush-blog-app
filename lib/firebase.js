import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBX5gkKsbOr1V0zxBuSqHWFct12dFOsQHA',
//   authDomain: 'nextfire-demo.firebaseapp.com',
//   projectId: 'nextfire-demo',
//   storageBucket: 'nextfire-demo.appspot.com',
//   messagingSenderId: '827402452263',
//   appId: '1:827402452263:web:c9a4bea701665ddf15fd02',
// };

const firebaseConfig = {
  apiKey: "AIzaSyALPnt_Camktr5455v403EmsFP7arjD_Jo",
  authDomain: "piyushblog-app.firebaseapp.com",
  projectId: "piyushblog-app",
  storageBucket: "piyushblog-app.appspot.com",
  messagingSenderId: "77744255602",
  appId: "1:77744255602:web:710e299e7d476ec7d208eb",
  measurementId: "G-22TFRYNLXM"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
