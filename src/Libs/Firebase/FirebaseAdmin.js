import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json';

class FirebaseAdmin {
  static instance = null;

  constructor(){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://fsjudowp.firebaseio.com",
      projectId: "fsjudowp"
    });
    this.msgSender = this.messaging();
  }

  static getInstance(){
    if(FirebaseAdmin.instance==null) FirebaseAdmin.instance = new FirebaseAdmin();
    return FirebaseAdmin.instance;
  }

  sendMsg(msg){
    
  }
}

export default FirebaseAdmin;
