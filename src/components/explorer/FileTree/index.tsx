import React from 'react';

import FileTreeItem from '../FileTreeItem';

import { ReactComponent as AddFileButton } from '../../../assets/icons/file-plus.svg';
import { ReactComponent as AddFolderButton } from '../../../assets/icons/folder-plus.svg';
import { ReactComponent as CollapseButton } from '../../../assets/icons/minus-square.svg';
import { ReactComponent as ExpandButton } from '../../../assets/icons/plus-square.svg';

import { useFileTreeStore } from '../../../store/FileTree/context';
import { dateToDateTime } from '../../../utils/Dates';
import { getDirectoryByPath, makeNewItemName } from '../../../utils/FileTree';

import './styles.css';

function FileTree() {
  const [state, dispatch] = useFileTreeStore();

  const handleAddFile = () => {
    const parentDirectory = getDirectoryByPath(state.rootItem, state.selectedPath);

    const newName = makeNewItemName(parentDirectory, 'new-file.txt');

    return dispatch({
      type: 'ADD_FILE',
      payload: {
        path: state.selectedPath,
        file: {
          name: newName,
          kind: 'file',
          size: '1KB',
          modified: dateToDateTime(new Date()),
        },
      },
    });
  };

  const handleAddDir = () => {
    const parentDirectory = getDirectoryByPath(state.rootItem, state.selectedPath);

    const newName = makeNewItemName(parentDirectory, 'new-directory');

    return dispatch({
      type: 'ADD_DIRECTORY',
      payload: {
        path: state.selectedPath,
        directory: {
          name: newName,
          kind: 'directory',
          children: [],
        },
      },
    });
  };

  const handleExpandAll = () => dispatch({ type: 'EXPAND_ALL' });

  const handleCollapseAll = () => dispatch({ type: 'COLLAPSE_ALL' });

  return (
    <div className="file-tree">
      <div className="file-tree__header">
        <div className="file-tree__header__left">
          {state.rootItem && (
            <AddFileButton
              className="file-tree__header__icon"
              title="Add file"
              onClick={() => handleAddFile()}
            />
          )}
          <AddFolderButton
            className="file-tree__header__icon"
            title="Add folder"
            onClick={() => handleAddDir()}
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
