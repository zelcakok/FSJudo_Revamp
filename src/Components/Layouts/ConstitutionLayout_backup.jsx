import React, {Component} from 'react';

import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  ContentState,
  convertFromHTML,
  CompositeDecorator,
  convertToRaw,
  getDefaultKeyBinding,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class ConstitutionLayout extends Component {
  constructor(props){
    super(props);

    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }

  }

  onEditorStateChange=(editorState) => {
    this.setState({editorState: editorState}, ()=>{
      console.log("Content: " + JSON.stringify(editorState));
    })
  };

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
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      <div>HEY
          {
            draftToHtml(this.state.editorState)
          }
        </div>
      </div>
    );
  }
}
export default ConstitutionLayout;
