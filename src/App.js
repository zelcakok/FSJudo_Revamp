import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';

import ComposerComponent from './Components/ComposerComponent';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : "富善柔道會 Fu Shin Judo"
    }
    this.refDrawer = React.createRef();
    this.refComposer = React.createRef();
  }

  setTitle=(title)=>{
    this.setState({title: title});
  }

  getTitle=()=>{
    return this.state.title;
  }

  openDrawer=()=>{
    this.refDrawer.current.openDrawer();
  }

  closeDrawer=()=>{
    this.refDrawer.current.closeDrawer();
  }

  nav=(strLayoutName)=>{
    this.refComposer.current.nav(strLayoutName);
  }

  render() {
    return (
      <div>

        <ComposerComponent ref={this.refComposer} controller={this}/>
      </div>
    );
  }
}

export default App;
