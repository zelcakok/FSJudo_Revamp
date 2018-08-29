import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


//Components
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';

//Import layouts here
import HomeLayout from './Layouts/HomeLayout';
import FBPageLayout from './Layouts/FBPageLayout';
import ConstitutionLayout from './Layouts/ConstitutionLayout';
import NewsFeedLayout from './Layouts/NewsFeedLayout';
import ConfigurationLayout from './Layouts/ConfigurationLayout';
import BugsLayout from './Layouts/BugsLayout';
import DebugLayout from './Layouts/DebugLayout';

import Installer from '../Installation/Installer';


class Content extends Component {
  render(){
    return(
      <Router>
         <Switch>
            <Route exact path='/專頁_FacebookPage' component={FBPageLayout} />
            <Route exact path='/會章_Constitution' component={ConstitutionLayout} />
            <Route exact path='/動態_NewsFeed' component={NewsFeedLayout} />
            <Route exact path='/設置_Configuration' component={ConfigurationLayout} />
            <Route exact path='/Bugs' component={BugsLayout} />
            <Route exact path='/Debug' component={DebugLayout} />
            <Route exact path='/Install' component={Installer}/>
            <Route component={HomeLayout} />
         </Switch>
       </Router>
    )
  }
}

class ComposerComponent extends Component {
  constructor(props){
    super(props);
    this.controller = props.controller;
  }

  nav=(strLayoutName)=>{
    switch (strLayoutName) {
      case "Home":
        window.location = "/";
        break;
      case "FBPage":
        window.location = "/專頁_FacebookPage";
        break;
      case "Constitution":
        window.location = "/會章_Constitution";
        break;
      case "NewsFeed":
        window.location = "/動態_NewsFeed";
        break;
      case "Configuration":
        window.location = "/設置_Configuration";
        break;
      case "Bugs":
        window.location = "/Bugs";
        break;
      case "Debug":
        window.location = "/Debug";
        break;
      case "Install":
        window.location = "/Install";
        break;
      default:
        window.location = "/";
    }
  }

  render(){
    return(
      <div>
        <AppBarComponent controller={this.controller}/>
        <DrawerComponent controller={this.controller} ref={this.controller.refDrawer}/>
        <Content/>
      </div>
    )
  }
}
  export default ComposerComponent;
