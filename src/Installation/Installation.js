import DBClient from '../Librarys/Firebase/DBClient';

class Installation {

  static dbConfig = {
    Roles: {
      "10213370621612862": {
        pvalue: 8
      },
      "1792457107510494": {
        pvalue: -5
      }
    }
  }

    static dbInit(){
      return new Promise((resolve, reject)=>{
        var dbC = DBClient.getInstance();
        dbC.write("/",Installation.dbConfig).then(()=>{
            resolve();
        });
      });
    }
}

export default Installation;
