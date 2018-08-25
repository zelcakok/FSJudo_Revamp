import React, {Component} from 'react';
import FBAdmin from '../Libs/Firebase/FirebaseAdmin';
import Session from '../Libs/Firebase/Session';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import { FacebookLogin } from 'react-facebook-login-component';

class DebugLayout extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount=()=>{

  }

  responseFacebook (response) {
    console.log(response);
    //anything else you want to do(save to localStorage)...
  }

  render(){
    return (
      <div style={{padding:"20px"}}>
        <Button variant="raised" component="label">
          Login with Facebook
          <FacebookLogin
                       style={{display:"none"}}
                       socialId="886993984812120"
                       language="en_US"
                       scope="public_profile,email"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       fields="id,email,name"
                       version="v2.5"
                       className="facebook-login"
                       buttonText="Login With Facebook"/>
         </Button>
      </div>
    );
  }
}

export default DebugLayout;
