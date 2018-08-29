import firebase from 'firebase';
import Authenticator from './Authenticator';

class Session {
  static instance = null;

  constructor(){
    var config = {
      apiKey: "AIzaSyC67ILtUDk8uXTTmyJCrgRW5b-V7DPsjl4",
      authDomain: "fsjudo-ae4c2.firebaseapp.com",
      databaseURL: "https://fsjudo-ae4c2.firebaseio.com",
      projectId: "fsjudo-ae4c2",
      storageBucket: "",
      messagingSenderId: "940818948881"
    };
    this.session = firebase.initializeApp(config);
    this.isAuthed = false;
  }

  /*
    Change later
  */
  static getSession(){
    return new Promise((resolve, reject)=>{
      Authenticator.getInstance().emailAuth("webpage@fsjudo.com", "KLicsoywetJesh5").then((credential)=>{
        if(credential.status) resolve(credential);
        else reject(credential);
      })
    });
  }

  static getInstance(){
    if(Session.instance==null) Session.instance = new Session();
    return Session.instance;
  }

  static setAuthed(){
    Session.instance.isAuthed = true;
  }

  static isAuthed(){
    if(Session.instance==null) return false;
    return Session.instance.isAuthed;
  }

}

export default Session;
