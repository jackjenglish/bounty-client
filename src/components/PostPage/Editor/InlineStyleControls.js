import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import StyleButton from './StyleButton';
import Bold from '@material-ui/icons/FormatBold';
import Italic from '@material-ui/icons/FormatItalic';
import Underline from '@material-ui/icons/FormatUnderlined';

var INLINE_STYLES = [
  { label: <Bold />, style: 'BOLD' },
  { label: <Italic />, style: 'ITALIC' },
  { label: <Underline />, style: 'UNDERLINE' }
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
