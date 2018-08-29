import DBClient from "../Firebase/DBClient";

class PermissionControl {
  /*
    Guest       [General]
    NON_MEMBER  [General, Social(Request to group)]
    MEMBER      [General, Social]
    MANAGE      [General, Social, Management]
    DEVELOPER   [General, Social, Management, Developer]

    Algorithm
      P value = [GUEST, NON_MEMBER, MEMBER]
      R value = [MANAGE, Developer]

      D value = P * R[(1 + R^)]

      D = 0   ==> GUEST
      D = -1  ==> NON_MEMBER
      D = 1   ==> MEMBER

      D = -3   ==> NON_MEMBER, MANAGE
      D = -5   ==> NON_MEMBER, DEVELOPER
      D = -8   ==> NON_MEMBER, MANAGE, DEVELOPER

      D = 3   ==> MEMBER, MANAGE
      D = 5   ==> MEMBER, DEVELOPER
      D = 8   ==> MEMBER, MANAGE, DEVELOPER
  */
  static GUEST=0;
  static NON_MEMBER=-1;
  static MEMBER=1;
  static MANAGE=2;
  static DEVELOPER=4;

  static grantPermission(userInfo){
    if(typeof(userInfo)==="undefined" || userInfo===null) return PermissionControl.GUEST;
    else if(!userInfo.canPost) return PermissionControl.NON_MEMBER;
    else return PermissionControl.MEMBER;
  }

  static getPermission(uid){
    if(typeof(uid)==="undefined" || uid===null) return null;
    return new Promise((resolve, reject)=>{
      DBClient.getInstance().read("/Roles/"+uid).then((value)=>{
        resolve(value);
      })
    });
  }

  static getTags(pvalue){
    switch (pvalue) {
      case 0: return "General";
      case -1: return "General|Social_Request";
      case 1: return "General|Social";
      case -3: return "General|Social_Request|Management";
      case -5: return "General|Social_Request|Developer";
      case -8: return "General|Social_Request|Management|Developer";
      case 3: return "General|Social|Management";
      case 5: return "General|Social|Developer";
      case 8: return "General|Social|Management|Developer";
      default: return "General";
    }
  }
}
export default PermissionControl;
