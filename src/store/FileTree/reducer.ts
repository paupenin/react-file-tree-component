import { getDirectoryByPath, getItemByPath, getNestedDirectories, sortChildren } from "../../utils/FileTree";
import { ActionType } from "./actions";
import { FileTreeStateType } from "./context";

/**
 * Reducer for FileTree context
 *
 * @param state FileTreeStateType
 * @param action ActionType
 * @returns FileTreeStateType
 */
export default function reducer(state: FileTreeStateType, action: ActionType): FileTreeStateType {
  switch (action.type) {
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedPath: action.payload.path,
      };
    case 'ADD_DIRECTORY':
      const directoryExists = getItemByPath(
        state.rootItem,
        `${action.payload.path}/${action.payload.directory.name}`,
      );

      if (directoryExists) {
        return state;
      }

      const newRootItemAddDirectory = { ...state.rootItem };

      const parentDirAddDirectory = getDirectoryByPath(newRootItemAddDirectory, action.payload.path);

      parentDirAddDirectory.children.push(action.payload.directory);

      // Sort children alphabetically
      sortChildren(parentDirAddDirectory);

      return {
        ...state,
        rootItem: newRootItemAddDirectory,
      };
    case 'ADD_FILE':
      const fileExists = getItemByPath(
        state.rootItem,
        `${action.payload.path}/${action.payload.file.name}`,
      );

      if (fileExists) {
        return state;
      }
      
      const newRootItemAddFile = { ...state.rootItem };

      const parentDirAddFile = getDirectoryByPath(newRootItemAddFile, action.payload.path);

      parentDirAddFile.children.push(action.payload.file);

      // Sort children alphabetically
      sortChildren(parentDirAddFile);

      return {
        ...state,
        rootItem: newRootItemAddFile,
      };
    case 'TOGGLE_DIRECTORY':
      // Clone state expandedDirectories
      const newExpandedDirectories = [...state.expandedDirectories];

      // Add or Remove payload directory
      const pathIndex = newExpandedDirectories.indexOf(action.payload.path);
      if (pathIndex === -1) {
        newExpandedDirectories.push(action.payload.path);
      } else {
        newExpandedDirectories.splice(pathIndex, 1);
      }

      const newState = {
        ...state,
        expandedDirectories: newExpandedDirectories,
      };

      // Reuse reducer to select item when toggling directories to prevent dispatching
      // multiple actions causing multiple renders. This could be avoided using Redux.
      return reducer(newState, { type: 'SELECT_ITEM', payload: { path: action.payload.path } });
    case 'EXPAND_ALL':
      return {
        ...state,
        expandedDirectories: [
          state.rootItem.name,
          ...getNestedDirectories(state.rootItem, state.rootItem.name),
        ],
      };
    case 'COLLAPSE_ALL':
      return {
        ...state,
        expandedDirectories: [],
      };
    case 'DRAG_TARGET_ENTER':
      if (action.payload.path === state.dragTargetPath) return state;

      return {
        ...state,
        dragTargetPath: action.payload.path,
      };
    case 'DRAG_TARGET_LEAVE':
      return {
        ...state,
        dragTargetPath: undefined,
      };
    case 'DRAG_END':
      // If target don't exist we don't need to perform any action
      if (!state.dragTargetPath) return state;

      const originDirPath = action.payload.path.slice(0, action.payload.path.lastIndexOf('/'));
      const targetDirPath = state.dragTargetPath;

      // If directories are the same we don't need to perform any action
      if (originDirPath === targetDirPath) return state;

      const newRootItemDragEnd = { ...state.rootItem };

      const originItem = getItemByPath(newRootItemDragEnd, action.payload.path);
      if (!originItem) return state;

      const targetItem = getItemByPath(newRootItemDragEnd, `${targetDirPath}/${originItem?.name}`);
      if (targetItem) return state;

      // Get target directory
      const targetParentDir = getDirectoryByPath(newRootItemDragEnd, targetDirPath);

      // Add item to target directory
      targetParentDir.children.push(originItem);

      // Sort children alphabetically
      sortChildren(targetParentDir);

      // Remove item from origin directory
      const originParentDir = getDirectoryByPath(newRootItemDragEnd, originDirPath);
      const originalIndex = originParentDir.children.findIndex((c) => c.name === originItem.name);
      originParentDir.children.splice(originalIndex, 1);

      return {
        ...state,
        rootItem: newRootItemDragEnd,
        dragTargetPath: undefined,
      };
    default:
      return state;
  }
}
