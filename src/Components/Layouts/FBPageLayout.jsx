import React, {Component} from 'react';

class FBPageLayout extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

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

  render(){
    return(
      <div style={{textAlign:"center", margin:"20px"}}>
        [CONTENT START HERE]
      </div>
    )
  }
}
export default FBPageLayout;
