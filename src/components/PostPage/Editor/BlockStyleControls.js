import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import StyleButton from './StyleButton';
import UL from '@material-ui/icons/FormatListBulleted';
import OL from '@material-ui/icons/FormatListNumbered';
import Quote from '@material-ui/icons/FormatQuote';
import Code from '@material-ui/icons/Code';

const BLOCK_TYPES = [
  //{ label: 'H1', style: 'header-one' },
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  //{ label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  { label: <Quote />, style: 'blockquote' },
  { label: <UL />, style: 'unordered-list-item' },
  { label: <OL />, style: 'ordered-list-item' },
  { label: <Code />, style: 'code-block' }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
