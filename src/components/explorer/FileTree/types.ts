export type FileTreeItemKind = 'directory' | 'file';

export interface FileTreeItemDirectory {
  name: string,
  kind: 'directory',
  children: FileTreeItem[],
}

export interface FileTreeItemFile {
  name: string,
  kind: 'file',
  size: string,
  modified: string,
}

export type FileTreeItem = FileTreeItemDirectory | FileTreeItemFile;
