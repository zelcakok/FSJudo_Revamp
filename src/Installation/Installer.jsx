import React, {Component} from 'react';
import Installation from './Installation';

class Installer extends Component {
  resize=()=>this.forceUpdate();

  componentWillMount(){
    this.resize();
  }

  componentDidMount(){
    window.addEventListener('resize', this.resize);
  }

  componentWillUnMount(){
    window.removeEventListener('resize', this.resize);
  }

  install=()=>{
    Installation.dbInit();
  }

  render(){
    return(
      <div>
        <button onClick={this.install}>Install</button>
      </div>
    )
  }
}
export default Installer;
