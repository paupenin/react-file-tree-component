import React from 'react';

import { FileTreeItemType } from '../../../types/FileTreeTypes';

import { ReactComponent as FolderChevronIcon } from '../../../assets/icons/chevron.svg';
import { ReactComponent as FileIcon } from '../../../assets/icons/file.svg';

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

  const isExpanded =
    isDirectory && state.expandedDirectories.includes(itemPath);

  const isSelected = state.selectedPath === itemPath;

  const isDragTarget = state.dragTargetPath === itemPath;

  const handleClick = () => {
    if (isDirectory) {
      dispatch({ type: 'TOGGLE_DIRECTORY', payload: { path: itemPath } });
    } else {
      dispatch({ type: 'SELECT_ITEM', payload: { path: itemPath } });
    }
  };

  const handleDragEnter = () => {
    // Add timeout to prevent losing target when triggering "leave" event on
    // previous element before trigger "enter" on the new one
    setTimeout(() => {
      if (!isDirectory) return;

      dispatch({
        type: 'DRAG_TARGET_ENTER',
        payload: {
          path: itemPath,
        },
      });
    }, 200);
  };

  const handleDragLeave = () => {
    // Add timeout to prevent losing target when triggering "leave" event on
    // current element before trigger "end"
    setTimeout(() => {
      if (!isDirectory || !state.dragTargetPath) return;

      dispatch({ type: 'DRAG_TARGET_LEAVE' });
    }, 100);
  };

  const handleDragEnd = () => {
    dispatch({ type: 'DRAG_END', payload: { path: itemPath } });
  };

  return (
    <div
      className={`file-tree-item ${
        isDragTarget ? 'file-tree-item--drag-target' : ''
      }`}
    >
      <div
        className="file-tree-item__line"
        title={isDirectory ? itemPath : `${itemPath} · ${item.size}`}
        onClick={() => handleClick()}
        onDragEnter={() => handleDragEnter()}
        onDragLeave={() => handleDragLeave()}
        onDragEnd={() => handleDragEnd()}
        draggable
      >
        {isDirectory ? (
          <FolderChevronIcon
            className={`file-tree-item__icon file-tree-item__icon--directory ${
              isExpanded ? 'file-tree-item__icon--directory--expanded' : ''
            }`}
          />
        ) : (
          <FileIcon className="file-tree-item__icon file-tree-item__icon--file" />
        )}

        <span
          className={`file-tree-item__name ${
            isSelected ? 'file-tree-item__name--selected' : ''
          }`}
        >
          {item.name}
        </span>
      </div>

      {isDirectory && (
        <div
          className={`file-tree-item__children ${
            isExpanded ? 'file-tree-item__children--expanded' : ''
          }`}
        >
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
