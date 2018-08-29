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
  append=(ref, val)=>{
    return new Promise((resolve, reject)=>{
      Session.getSession().then((credential)=>{
        this.dbC.ref(ref).push(val, function(err){
          if(err) reject(err);
          else resolve();
        });
      })
    });
  }

  /*
    Override all the values
  */
  write=(ref, val)=>{
    return new Promise((resolve, reject)=>{
      Session.getSession().then((credential)=>{
        this.dbC.ref(ref).set(val, (err)=>{
          if(err) reject(err);
          else resolve();
        });
      })
    });
  }

  monitor=(ref, callback)=>{
    this.dbC.ref(ref).on('value', function(snapshot){
      callback(snapshot.val());
    });
  }

  async monitorAsync(ref){
    return await new Promise(resolve=>{
      this.dbC.ref(ref).on('value', function(snapshot){
        // console.log(snapshot.val());
        resolve(snapshot.val());
      });
    });
  }

  read=(ref)=>{
    return new Promise((resolve, reject)=>{
      Session.getSession().then((credential)=>{
        this.dbC.ref(ref).once('value', function(snapshot){
          resolve(snapshot.val());
        });
      })
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
