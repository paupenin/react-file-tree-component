import React, { useEffect } from 'react';

import hljs from 'highlight.js';

import 'highlight.js/styles/github.css';
import './styles.css';

import codeExample from './codeExample';

function FileEditor() {
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className="file-editor">
      <div className="file-editor__header">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://test3.gno.land/p/demo/avl/avl.gno"
        >
          /p/demo/avl/avl.gno
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
