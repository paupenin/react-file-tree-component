import React from 'react';

import FileTreeItem from '../FileTreeItem';

import { ReactComponent as AddFileButton } from '../../../assets/icons/file-plus.svg';
import { ReactComponent as AddFolderButton } from '../../../assets/icons/folder-plus.svg';
import { ReactComponent as CollapseButton } from '../../../assets/icons/minus-square.svg';
import { ReactComponent as ExpandButton } from '../../../assets/icons/plus-square.svg';

import { useFileTreeStore } from '../../../store/FileTree/context';

import './styles.css';


  const handleExpandAll = () => dispatch({ type: 'EXPAND_ALL' });

  const handleCollapseAll = () => dispatch({ type: 'COLLAPSE_ALL' });

  return (
    <div className="file-tree">
      <div className="file-tree__header">
        <div className="file-tree__header__left">
          <AddFileButton
            className="file-tree__header__icon"
            title="Add file"
          />
          <AddFolderButton
            className="file-tree__header__icon"
            title="Add folder"
          />
        </div>

        <div className="file-tree__header__right">
          {state.expandedDirectories.length !== 0 && (
            <CollapseButton
              className="file-tree__header__icon"
              title="Collapse all"
              onClick={() => handleCollapseAll()}
            />
          )}
          <ExpandButton
            className="file-tree__header__icon"
            title="Expand all"
            onClick={() => handleExpandAll()}
          />
        </div>
      </div>
      <div className="file-tree__explorer">
        {state.rootItem ? (
          <FileTreeItem item={state.rootItem} />
        ) : (
          <p>Create a directory to get started</p>
        )}
      </div>
    </div>
  );
}

export default FileTree;
