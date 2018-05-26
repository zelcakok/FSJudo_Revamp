import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import Drawer from '@material-ui/core/SwipeableDrawer';
import AccountsIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import Grey from '@material-ui/core/colors/grey';

import DrawerLayout from './DrawerLayout';

class AppBarLayout extends Component {

  constructor(props){
    super(props);
    this.drawer = React.createRef();
    this.styles = {
      MenuButton : {
        marginLeft: "-15px"
      },
      AppBarTitle : {
        marginLeft: "5px",
        flex: 1
      },
      Drawer : {
        width: "200px"
      },
      SignIn : {
        marginLeft: "5px",
      }
    }
  }

  openDrawer=()=>{
    this.drawer.current.toggleDrawer(true);
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton style={this.styles.MenuButton}
                        onClick={this.openDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" style={this.styles.AppBarTitle}>
              Fu Shin Judo
            </Typography>
            <Button variant="raised">
              SIGN IN
              <AccountsIcon style={this.styles.SignIn}/>
            </Button>
          </Toolbar>
        </AppBar>
        <DrawerLayout ref={this.drawer}/>
      </div>
    );
  }
}

export default AppBarLayout;
