import React from 'react';

import { FileTreeItemType } from '../../../types/FileTreeTypes';

import {ReactComponent as FolderChevronIcon} from '../../../assets/icons/chevron.svg';
import {ReactComponent as FileIcon} from '../../../assets/icons/file.svg';

import './styles.css';

function FileTreeItem({
  item,
  path,
}: {
  item: FileTreeItemType;
  path?: string;
}) {
  const isDirectory = item.kind === 'directory';
  const itemPath = path ? `${path}/${item.name}` : item.name;
  const isExpanded = false;
  const isSelected = false;

  return (
    <div className="file-tree-item">
      <div
        className="file-tree-item__line"
        title={isDirectory ? itemPath : `${itemPath} · ${item.size}`}
      >
        {isDirectory ? (
          <FolderChevronIcon
            className={
              `file-tree-item__icon file-tree-item__icon--directory ${
                isExpanded ? 'file-tree-item__icon--directory--expanded' : ''
              }`
            }
          />
        ) : (
          <FileIcon className="file-tree-item__icon file-tree-item__icon--file" />
        )}

        <span className={`file-tree-item__name ${
          isSelected ? 'file-tree-item__name--selected' : ''
        }`}>{item.name}</span>
      </div>

      {isDirectory && (
        <div className="file-tree-item__children">
          {item.children.map((child) => (
            <FileTreeItem item={child} path={itemPath} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileTreeItem;
