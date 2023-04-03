import React, { useEffect } from 'react';

import hljs from 'highlight.js';

import { useFileTreeStore } from '../../../store/FileTree/context';
import codeExample from './codeExample';

import 'highlight.js/styles/github.css';
import './styles.css';

function FileEditor() {
  const [state] = useFileTreeStore();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="file-editor">
      <div className="file-editor__header">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://test3.gno.land/${state.selectedPath}`}
        >
          {state.selectedPath}
        </a>
      </div>
      <pre>
        <code className="hljs language-go">
          {codeExample}
        </code>
      </pre>
    </div>
  );
}

export default FileEditor;
