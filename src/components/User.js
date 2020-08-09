import { db, auth } from '../config/firebase.config'

export async function getUser() {
    // obtener un solo doc
    const query = await db.collection('users').where('email', '==', auth.currentUser.email).get();
    const snapshot = query.docs[0];
    const data = { ...snapshot.data(), id: snapshot.id }
    
    return data;
  
}