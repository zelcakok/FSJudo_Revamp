import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';

class Content extends Component {
  constructor(props){
    super(props);
    this.parent = props.parent;
  }

  navHome=()=>{
    window.location = "/";
  }

  render(){
    return (
      <div>
        <MenuItem onClick={()=>{this.parent.toggleDrawer(false)}}>
          <ListItemIcon><ArrowBackIcon/></ListItemIcon>
          <ListItemText>Close Menu</ListItemText>
        </MenuItem>
        <Divider light/>
        <List>
          <ListItem button>
            <Avatar>
              <HomeIcon />
            </Avatar>
            <ListItemText primary="首頁" secondary="Home" onClick={this.navHome}/>
          </ListItem>
          <ListItem button>
            <Avatar>
              <AssignmentIcon />
            </Avatar>
            <ListItemText primary="會章" secondary="Constitution" />
          </ListItem>
        </List>        
      </div>
    );
  }
}

class DrawerLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpened:false
    }
    this.styles = {
      Drawer : {
        width: "230px"
      }
    }
  }

  toggleDrawer=(state)=>{
    this.setState({isOpened:state});
  }

  render() {
    return (
      <SwipeableDrawer open={this.state.isOpened}
                       onOpen={()=>{this.toggleDrawer(true)}}
                       onClose={()=>{this.toggleDrawer(false)}}>
        <div style={this.styles.Drawer}
             onKeyDown={this.toggleDrawer}>
          <Content parent={this}/>
        </div>
      </SwipeableDrawer>
    );
  }
}

export default DrawerLayout;
