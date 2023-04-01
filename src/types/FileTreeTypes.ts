export type FileTreeItemKindType = 'directory' | 'file';

export interface FileTreeItemDirectoryType {
  name: string,
  kind: 'directory',
  children: FileTreeItemType[],
}

export interface FileTreeItemFileType {
  name: string,
  kind: 'file',
  size: string,
  modified: string,
}

export type FileTreeItemType = FileTreeItemDirectoryType | FileTreeItemFileType;
