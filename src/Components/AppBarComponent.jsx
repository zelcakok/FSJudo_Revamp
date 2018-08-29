import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import MenuIcon from '@material-ui/icons/Menu';
import FacebookIcon from './Layouts/Resources/facebookIcon.png';

import swal from 'sweetalert2';
import FBClient from '../Librarys/Facebook/FBClient';
import Loading from './Layouts/Resources/loading.gif';
import Cacher from '../Librarys/LocalStorage/Cacher';

class AppBarComponent extends Component {
  constructor(props){
    super(props);
    this.controller = props.controller;
    this.state = {
      icon : FacebookIcon,
      displayName : "Sign In",
      isSignDisabled: false
    }
    this.onUserInfoUpdate = new Event("onUserInfoUpdate");
  }

  settingUpInfo=(info)=>{
    if(!Cacher.hasItem("msg"))
      swal({
        title: 'Setting up ...',
        text: 'It will finish in several seconds.',
        showConfirmButton: false,
        allowOutsideClick: false,
        imageUrl: Loading,
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Loading',
      });
    this.setState({displayName:info.displayName.name, icon:info.picture}, ()=>{
      if(!Cacher.hasItem("msg")){
        swal.close();
        swal({
          showConfirmButton: false,
          timer: 1200,
          title: 'Done',
          text: 'Welcome back ' + info.displayName.name,
          type:'success',
        })
        Cacher.cache("msg", true);
      }
      document.dispatchEvent(this.onUserInfoUpdate);
    });
  }

  //This may not needed
  // fbInit=()=>{
  //   this.fbC = FBClient.getInstance(window.FB);
  // }

  resize=()=>this.forceUpdate()

  componentWillMount(){
    // document.addEventListener("FBObjectReady", this.fbInit);
    this.fbC = FBClient.getInstance(window.FB);
    if(Cacher.hasItem("userInfo")){
      this.settingUpInfo(Cacher.retrieveItem("userInfo"));
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    // document.removeEventListener("FBObjectReady", this.fbInit);
    window.removeEventListener('resize', this.resize);
  }

  openDrawer=()=>{
    this.controller.openDrawer();
  }

  btnSignIn=()=>{
    this.fbC.getStatus().then((result)=>{
      if(result.status==="connected") this.logout();
      else this.login();
    });
  }

  login=()=>{
    this.fbC.login().then((info)=>{
      Cacher.cache("userInfo", info);
      this.settingUpInfo(info);
    })
  }

  logout=()=>{
    swal({
      title: 'Are you sure to logout?',
      text: "You're always welcome back !!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.value) {
        window.FB.logout((response)=>{
          Cacher.wipeItem("userInfo");
          Cacher.wipeItem("msg");
          swal({
            title: "Done !",
            text: "You've been logged out.",
            type: 'success',
            showConfirmButton: false,
            timer: 1200
          }).then(()=>{window.location="/"})
        });
      }
    })
  }

  render(){
    return(
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton style={{marginLeft:"-15px"}} color="inherit" aria-label="Menu" onClick={this.openDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography style={{flexGrow:1}} variant="title" color="inherit">
              {this.controller.getTitle()}
          </Typography>
          <Button color="inherit" onClick={this.btnSignIn} disabled={this.state.isSignDisabled}>
            {
              this.state.icon !== FacebookIcon?
                <Avatar>
                  <img src={this.state.icon} alt="fbIcon"/>
                </Avatar>
              : <img src={this.state.icon} alt="fbIcon" style={{marginLeft:"5px", width:"auto", height:"35px"}}/>
            }
            <Typography
              className={this.state.icon !== FacebookIcon?"displayName":""}
              style={{flexGrow:1, marginTop:"1px", fontWeight:"bold", marginLeft:"5px"}} variant="subheading" color="inherit">
                {window.innerWidth >= 600 ? this.state.displayName : ""}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default AppBarComponent;
