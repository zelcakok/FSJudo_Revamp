import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

//Debug
import LeftArrow from '@material-ui/icons/ChevronLeft';
import HotIcon from '@material-ui/icons/FiberNew';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BugIcon from '@material-ui/icons/BugReport';
import DeveloperIcon from '@material-ui/icons/DeveloperBoard';
import SettingIcon from '@material-ui/icons/Settings';
import PageIcon from '@material-ui/icons/TurnedIn';


import Cacher from '../Librarys/LocalStorage/Cacher';
import PermissionControl from '../Librarys/Permission/PermissionControl';

class DrawerComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDrawerOpened : false,
      userMode : PermissionControl.getTags(0)
    }
    this.controller = props.controller;
  }

  invalidate=()=>{
    this.setState({userMode: PermissionControl.getTags(Cacher.retrieveItem("userInfo").pvalue)});
  }

  resize=()=>this.forceUpdate()

  componentWillMount(){
    document.addEventListener("onUserInfoUpdate", this.invalidate);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
    document.removeEventListener("onUserInfoUpdate", this.invalidate);
  }

  toggleDrawer=(open)=>()=>{
    this.setState({
      isDrawerOpened : open
    });
  };

  openDrawer=()=>{
    this.setState({isDrawerOpened : true});
  }

  closeDrawer=()=>{
    this.setState({isDrawerOpened : false});
  }

  nav=(strLayoutName)=>()=>{
    this.controller.nav(strLayoutName);
  }

  getUserInfo=()=>{
    if(!Cacher.hasItem("userInfo")) return null;
    return Cacher.retrieveItem("userInfo");
  }

  render(){
    return (
      <SwipeableDrawer
        open={this.state.isDrawerOpened}
        onClose={this.toggleDrawer(false)}
        onOpen={this.toggleDrawer(true)}
      >
        <div style={{width:"auto"}}>
            <ListItem button onClick={this.closeDrawer}>
              <ListItemIcon>
                <LeftArrow />
              </ListItemIcon>
              <ListItemText primary="Collapse" />
            </ListItem>

            <Divider/>

            <List component="nav">
              {/*General*/}
              <Typography variant="title" style={{fontSize:"15px", marginTop:"10px", marginBottom:"5px", marginLeft:"15px"}}>General</Typography>

              <ListItem button onClick={this.nav("Home")}>
                <ListItemIcon>
                  <Avatar style={{backgroundColor:"rgb(246, 85, 124)"}}><HomeIcon style={{color:"white"}}/></Avatar>
                </ListItemIcon>
                <ListItemText primary="首頁" secondary="Home" onClick={this.navHome}/>
              </ListItem>

              <ListItem button onClick={this.nav("FBPage")}>
                <ListItemIcon>
                  <Avatar style={{backgroundColor:"rgb(246, 85, 124)"}}><PageIcon style={{color:"white"}}/></Avatar>
                </ListItemIcon>
                <ListItemText primary="專頁" secondary="Facebook Page" />
              </ListItem>

              <ListItem button onClick={this.nav("Constitution")}>
                <ListItemIcon>
                  <Avatar style={{backgroundColor:"rgb(246, 85, 124)"}}><AssignmentIcon style={{color:"white"}}/></Avatar>
                </ListItemIcon>
                <ListItemText primary="會章" secondary="Constitution" />
              </ListItem>

              {/*Social*/}
              {
                this.state.userMode.includes("Social") ?
                  <div>
                    <Divider/>
                    <Typography variant="title" style={{fontSize:"15px", marginTop:"10px", marginBottom:"5px", marginLeft:"15px"}}>Social</Typography>

                    <ListItem button onClick={this.nav("NewsFeed")}>
                      <ListItemIcon>
                        <Avatar style={{backgroundColor:"#6daffc"}}><HotIcon style={{color:"white"}}/></Avatar>
                      </ListItemIcon>
                      <ListItemText primary="動態" secondary="NewsFeed" onClick={this.navHome}/>
                    </ListItem>
                  </div>
                : null
              }

              {/*Management*/}
              {
                this.state.userMode.includes("Management") ?
                  <div>
                    <Divider/>
                    <Typography variant="title" style={{fontSize:"15px", marginTop:"10px", marginBottom:"5px", marginLeft:"15px"}}>Management</Typography>

                    <ListItem button onClick={this.nav("Configuration")}>
                      <ListItemIcon>
                        <Avatar><SettingIcon style={{color:"white"}}/></Avatar>
                      </ListItemIcon>
                      <ListItemText primary="設置" secondary="Configuration" />
                    </ListItem>
                  </div>
                : null
              }

              {/*Developer*/}
              {
                this.state.userMode.includes("Developer") ?
                  <div>
                    <Divider/>
                    <Typography variant="title" style={{fontSize:"15px", marginTop:"10px", marginBottom:"5px", marginLeft:"15px"}}>Developer</Typography>

                    <ListItem button onClick={this.nav("Bugs")}>
                      <ListItemIcon>
                        <Avatar style={{backgroundColor:"#f57256"}}><BugIcon style={{color:"white"}}/></Avatar>
                      </ListItemIcon>
                      <ListItemText primary="Bugs" secondary="Pending cases" />
                    </ListItem>

                    <ListItem button onClick={this.nav("Debug")}>
                      <ListItemIcon>
                        <Avatar style={{backgroundColor:"#f57256"}}><DeveloperIcon style={{color:"white"}}/></Avatar>
                      </ListItemIcon>
                      <ListItemText primary="Debug" secondary="Debug" />
                    </ListItem>
                  </div>
                : null
              }
            </List>
        </div>
      </SwipeableDrawer>
    )
  }
}

export default DrawerComponent;
