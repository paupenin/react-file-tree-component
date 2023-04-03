import React from 'react';

import FileTree from '../../../components/explorer/FileTree';
import FileEditor from '../../../components/editor/FileEditor';

import './styles.css';

function CodeEditorView() {
  return (
    <div className="code-editor">
      <div className="code-editor__panel">
        <FileTree />
      </div>
      <div className="code-editor__content">
        <FileEditor />
      </div>
    </div>
  );
}

export default CodeEditorView;
