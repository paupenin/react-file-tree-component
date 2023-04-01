import React from 'react';

import fileTreeData from '../../../data/FileTreeData';
import FileTree from '../../../components/explorer/FileTree';
import FileEditor from '../../../components/editor/FileEditor';

import './styles.css';

function CodeEditorView() {
  return (
    <div className="code-editor">
      <div className="code-editor__panel">
        <FileTree fileTreeData={fileTreeData} />
      </div>
      <div className="code-editor__content">
        <FileEditor />
      </div>
    </div>
  );
}

export default CodeEditorView;
