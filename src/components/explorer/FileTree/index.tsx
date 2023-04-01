import React from 'react';

import { FileTreeItemType } from './types';

import FileTreeItem from '../FileTreeItem';

import {ReactComponent as AddFileButton} from '../../../assets/icons/file-plus.svg';
import {ReactComponent as AddFolderButton} from '../../../assets/icons/folder-plus.svg';
import {ReactComponent as CollapseButton} from '../../../assets/icons/minus-square.svg';
import {ReactComponent as ExpandButton} from '../../../assets/icons/plus-square.svg';

import './styles.css';

function FileTree({ fileTreeData }: { fileTreeData: FileTreeItemType }) {
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
          <CollapseButton
            className="file-tree__header__icon"
            title="Collapse all"
          />
          <ExpandButton
            className="file-tree__header__icon"
            title="Expand all"
          />
        </div>
      </div>
      <div className="file-tree__explorer">
        <FileTreeItem item={fileTreeData} />
      </div>
    </div>
  );
}

export default FileTree;
