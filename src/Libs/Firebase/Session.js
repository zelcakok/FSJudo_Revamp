import firebase from 'firebase';

class Session {
  static instance = null;

  constructor(){
    var config = {
      apiKey: "AIzaSyBVruGbGX67cVLMlmvFyP3z1XuIg6bOtUQ",
      authDomain: "fsjudowp.firebaseapp.com",
      databaseURL: "https://fsjudowp.firebaseio.com",
      projectId: "fsjudowp",
      storageBucket: "fsjudowp.appspot.com",
      messagingSenderId: "437073604286"
    };
    this.session = firebase.initializeApp(config);
    this.msgReceiver = firebase.messaging();
    this.auth = firebase.auth();
    this.isAuthed = false;
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

  requestPermission(){
    this.msgReceiver.requestPermission().then(function() {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }).catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
  }

  requestMsgToken(){
    this.msgReceiver.getToken().then(function(currentToken) {
      if (currentToken) {
          console.log("Current token: " + currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.

      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);

    });
  }
}

export default Session;
