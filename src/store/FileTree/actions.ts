import { FileTreeItemDirectoryType, FileTreeItemFileType } from "../../types/FileTreeTypes";

/**
 * ActionType combines all accepted actions by reducer
 */
export type ActionType = ActionSelectItemType
  | ActionAddDirectoryType
  | ActionAddFileType
  | ActionToggleDirectoryType
  | ActionExpandAllType
  | ActionCollapseAllType
  | ActionDragTargetEnter
  | ActionDragTargetLeave
  | ActionDragEnd;

/**  
 * Reducer Actions
 */
interface ActionSelectItemType {
  type: 'SELECT_ITEM',
  payload: {
    path: string,
  },
}

interface ActionAddDirectoryType {
  type: 'ADD_DIRECTORY',
  payload: {
    path: string,
    directory: FileTreeItemDirectoryType,
  },
}

interface ActionAddFileType {
  type: 'ADD_FILE',
  payload: {
    path: string,
    file: FileTreeItemFileType,
  },
}

interface ActionToggleDirectoryType {
  type: 'TOGGLE_DIRECTORY',
  payload: {
    path: string,
  },
}

interface ActionExpandAllType {
  type: 'EXPAND_ALL',
}

interface ActionCollapseAllType {
  type: 'COLLAPSE_ALL',
}

interface ActionDragTargetEnter {
  type: 'DRAG_TARGET_ENTER',
  payload: {
    path: string,
  },
}

interface ActionDragTargetLeave {
  type: 'DRAG_TARGET_LEAVE',
}

interface ActionDragEnd {
  type: 'DRAG_END',
  payload: {
    path: string,
  },
}