import Session from './Session';

class DBClient {
  static instance = null;

  constructor(){
    this.dbC = Session.getInstance().session.database();
  }

  static getInstance(){
    if(DBClient.instance == null) DBClient.instance = new DBClient();
    return DBClient.instance;
  }

  /*
    Push to the reference
  */
  append=(ref, val, callback=null)=>{
    this.dbC.ref(ref).push(val, function(err){
      if(callback!=null) callback(err);
    });
  }

  /*
    Override all the values
  */
  write=(ref, val, callback=null)=>{
    this.dbC.ref(ref).set(val, function(err){
      if(callback!=null) callback(err);
    });
  }

  monitor=(ref, callback)=>{
    this.dbC.ref(ref).on('value', (snapshot)=>{
      callback(snapshot.val());
    });
  }

  read=(ref)=>{
    return this.dbC.ref(ref).once('value').then((snapshot)=>{
      return snapshot.val();
    });
  }

  /*
    Clear the reference
  */
  wipe=(ref, callback=null)=>{
    this.dbC.ref(ref).remove(function(err){
      if(callback!=null) callback(err);
    });
  }
}

export default DBClient;
