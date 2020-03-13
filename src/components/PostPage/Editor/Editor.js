import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromHTML,
  ContentState,
  Modifier
} from 'draft-js';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import { stateToHTML } from 'draft-js-export-html';
import './RichEditor.css';
import './EditorStyles.css';

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.editor = React.createRef();
    this.focus = () => this.editor.current.focus();

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTab = this.onTab.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  onChange(newState) {
    this.props.onChange(stateToHTML(newState.getCurrentContent()));
    this.setState({ editorState: newState });
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      // e.preventDefault();
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  onTab(e) {
    e.preventDefault();

    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      '  '
    );

    this.setState({
      editorState: EditorState.push(
        currentState,
        newContentState,
        'insert-characters'
      )
    });
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  createFromHTML() {
    const sampleMarkup =
      '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
      '<a href="http://www.facebook.com">Example link</a>';
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.setState({
      editorState: EditorState.createWithContent(state)
    });
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <div className="d-flex ">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>

        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            // placeholder="Tell a story..."
            ref={this.editor}
            spellCheck={true}
            aut
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'unstyled':
      return 'editorUnstyled';
    case 'header-one':
      return 'editorHeaderOne';
    case 'header-two':
      return 'editorHeaderTwo';
    case 'header-three':
      return 'editorHeaderThree';
    case 'blockquote':
      return 'editorBlockQuote';
    case 'code-block':
      return 'editorCodeBlock';
    default:
      return null;
  }
}

export default RichEditorExample;
