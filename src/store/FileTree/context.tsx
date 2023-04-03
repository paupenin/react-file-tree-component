import { createContext, useContext, useReducer } from 'react';

import fileTreeData from '../../data/fileTreeData';
import { FileTreeItemDirectoryType } from '../../types/FileTreeTypes';
import { ActionType } from './actions';
import reducer from './reducer';

/**
 * Store state
 */
export interface FileTreeStateType {
  rootItem: FileTreeItemDirectoryType;
  selectedPath: string;
  expandedDirectories: string[];
  dragTargetPath?: string;
}

const initialState: FileTreeStateType = {
  rootItem: fileTreeData,
  selectedPath: fileTreeData.name,
  expandedDirectories: [],
  dragTargetPath: undefined,
};

/**
 * Store context
 */
type FileTreeContextType = [FileTreeStateType, React.Dispatch<ActionType>];

const FileTreeContext = createContext<FileTreeContextType>([
  initialState,
  () => {},
]);

/**
 * Store provider
 */
export function FileTreeProvider({ children }: { children: JSX.Element }) {
  // Set up reducer with mocked data
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FileTreeContext.Provider value={[state, dispatch]}>
      {children}
    </FileTreeContext.Provider>
  );
}

export function useFileTreeStore() {
  return useContext(FileTreeContext);
}
