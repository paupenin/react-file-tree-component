import React from 'react';

import { FileTreeItemType } from '../../../types/FileTreeTypes';

import {ReactComponent as FolderChevronIcon} from '../../../assets/icons/chevron.svg';
import {ReactComponent as FileIcon} from '../../../assets/icons/file.svg';

import './styles.css';
import { useFileTreeStore } from '../../../store/FileTree/context';

function FileTreeItem({
  item,
  path,
}: {
  item: FileTreeItemType;
  path?: string;
}) {
  const [state, dispatch] = useFileTreeStore();

  const isDirectory = item.kind === 'directory';
  const itemPath = path ? `${path}/${item.name}` : item.name;

  const isExpanded = isDirectory && state.expandedDirectories.includes(itemPath);

  const isSelected = state.selectedPath === itemPath;

  const handleClick = () => {
    if (isDirectory) {
      dispatch({ type: 'TOGGLE_DIRECTORY', payload: { path: itemPath } });
    } else {
      dispatch({ type: 'SELECT_ITEM', payload: { path: itemPath } });
    }
  }

  return (
    <div className="file-tree-item">
      <div
        className="file-tree-item__line"
        title={isDirectory ? itemPath : `${itemPath} · ${item.size}`}
        onClick={() => handleClick()}
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
        <div className={
          `file-tree-item__children ${
            isExpanded ? 'file-tree-item__children--expanded' : ''
          }`
        }>
          <div className="file-tree-item__children__container">
            {item.children.map((child) => (
              <FileTreeItem key={child.name} item={child} path={itemPath} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileTreeItem;
