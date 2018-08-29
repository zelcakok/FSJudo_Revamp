import PermissionControl from '../Permission/PermissionControl';

class FBClient {
  static instance;

  constructor(FB){
    this.fb = FB;
    this.accessToken = null;
    this.userId = null;
  }

  static getInstance(FB){
    if(typeof(FBClient.instance)==="undefined") FBClient.instance = new FBClient(FB);
    return FBClient.instance;
  }


  /*
    Check current status

    connected ==> fill user data (Name, Picture, CanPost)

    else ==> Do nothing.
  */
  launchProcedures(){
    return new Promise((resolve, reject)=>{
      this.getStatus().then((response)=>{
        if(response.status==="connected"){
            resolve(this.fillUserInfo(response));
        } else {
          console.log("User is not signed in.");
        }
      }).catch(()=>{
        console.log("FB encounter error");
        reject();
      })
    });
  }

  getStatus(){
    return new Promise((resolve, reject)=>{
      if(this.fb == null) reject();
      else
        this.fb.getLoginStatus((response)=>{
          resolve(response);
        });
    });
  }

  /*
    fill accessToken, userId for FBClient.

    Get user's name through API
    Build URL for user's profile picture.
    Check if user can post.
  */
  fillUserInfo(response){
    return new Promise((resolve, reject)=>{
      this.accessToken = response.authResponse.accessToken;
      this.userId = response.authResponse.userID;

      this.api("name").then((name)=>{
        this.canUserPost().then((canPost)=>{
          PermissionControl.getPermission(this.userId).then((permission)=>{
            resolve({
              displayName: name,
              picture: this.getProfilePic(),
              canPost: canPost,
              pvalue: permission.pvalue
            });
          })
        })
      })
    });
  }

  login(){
    return new Promise((resolve, reject)=>{
      this.fb.login((response)=>{
        if(response.authResponse){
          resolve(this.fillUserInfo(response));
        }
      })
    });
  }

  logout(){
    return new Promise((resolve, reject)=>{
      this.fb.logout((response)=>{
        // user is now logged out
        console.log("Logout OK");
        resolve(response);
      });
    });
  }

  getProfilePic(){
    return "https://graph.facebook.com/"+this.userId+"/picture?type=large&width=40&height=40";
  }

  buildURL(fields){
    return "/"+this.userId+"?fields="+fields+"&access_token="+this.accessToken;
  }

  api(fields, build=true){
    var url = "";
    if(build) url = this.buildURL(fields);
    else url = fields;
    return new Promise((res,rej)=>{
      this.fb.api(url, (result)=>{
        res(result);
      })
    })
  }

  canUserPost(){
    return new Promise((res, rej)=>{
      this.api("groups").then((result)=>{
        console.log(result);
        if(!result.hasOwnProperty("groups")) res(false);
        else {
          // eslint-disable-next-line
          result.groups.data.map((key, value)=>{
            if(key.id==="191801832241") res(true)
          })
          if(this.hasNext(result.groups.paging))
             res(this.nextPage(result.groups.paging.next));
          else res(false)
        }
      });
    });
  }

  nextPage(url){
    return new Promise((res, rej)=>{
      this.api(url, false).then((result)=>{
        // eslint-disable-next-line
        result.data.map((key, value)=>{
          if(key.id==="191801832241") res(true)
        })
        if(this.hasNext(result.paging))
           res(this.nextPage(result.paging.next));
        else res(false)
      });
    })
  }

  hasNext(paging){
    return paging.hasOwnProperty("next");
  }
}

export default FBClient;
