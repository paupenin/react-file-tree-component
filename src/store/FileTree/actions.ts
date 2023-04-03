/**
 * ActionType combines all accepted actions by reducer
 */
 export type ActionType = ActionSelectItemType
 | ActionToggleDirectoryType
 | ActionExpandAllType
 | ActionCollapseAllType;

/**  
 * Reducer Actions
 */
interface ActionSelectItemType {
  type: 'SELECT_ITEM',
  payload: {
    path: string,
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
