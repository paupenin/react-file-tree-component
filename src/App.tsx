import React from 'react';

import { FileTreeProvider } from './store/FileTree/context';
import CodeEditorView from './views/editor/CodeEditor';

import './app.css';

function App() {
  return (
    <FileTreeProvider>
      <div className="app">
        <CodeEditorView />
      </div>
    </FileTreeProvider>
  );
}

export default App;
